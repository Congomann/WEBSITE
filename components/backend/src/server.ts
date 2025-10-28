import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs/promises';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = process.env.PORT || 3001;

// Define a local enum to avoid import issues from the frontend project structure
enum Role {
  Admin = 'admin',
  Advisor = 'advisor',
  User = 'user',
  Manager = 'manager',
  SubAdmin = 'subadmin',
  Underwriter = 'underwriter'
}


// Fix: __dirname is not available in ES modules. This recreates it.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', 'db.json');
// Define the path to the root of the project to serve static files
const STATIC_PATH = path.join(__dirname, '..', '..', '..');

// IMPORTANT: Replace with your secret key in a real environment.
// For this simulation, we use a test key.
// Ensure this is kept secret and not exposed on the client side.
const stripe = new Stripe('sk_test_51SGWYuAyRjRzCXot6TLt1NcVnZXiknLKaT2t2ZJvXC3Rq9rZCaQKDtzKBQ5aspDlxoFDZfjou2to8mAhjWWTxvEI00dSlrfjgc', {
  apiVersion: '2024-06-20',
});

// Initialize Gemini API
// The API key is expected to be in the environment variables
let ai: GoogleGenAI;
if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
} else {
    console.warn("API_KEY environment variable not set. Generative AI features will be disabled.");
}

// --- Middleware ---
app.use(cors());
// Fix: The express.json() middleware was causing a TypeScript overload error.
// It should be applied without a path argument to parse JSON bodies for all incoming requests, which is the standard usage.
app.use(express.json());

// --- Helper Functions ---
const readDb = async () => {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading database:", error);
        throw new Error('Could not read from database.');
    }
};

const writeDb = async (data: any) => {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing to database:", error);
        throw new Error('Could not write to database.');
    }
};


async function getSystemInstructionForRole(role: Role, userId: number, db: any): Promise<string> {
    let contextData = {};
    let baseInstruction = `You are a helpful AI assistant for New Holland Financial Group. Your user is a ${role}. Provide concise and helpful answers based on their role and the provided CRM data. Do not make up information if it's not in the data context.`;

    switch (role) {
        case Role.Advisor:
            const myLeads = db.leads.filter((l: any) => l.assignedTo === userId && (l.status === 'Contacted' || l.status === 'Qualified'));
            const myRequests = (db.advisorRequests || []).filter((r: any) => r.advisorId === userId && r.status === 'New');
            contextData = { 
                leadsNeedingFollowUp: myLeads.map((l:any) => ({ name: l.name, lastContacted: l.lastContacted })),
                newClientRequests: myRequests.map((r:any) => ({ name: r.name, type: r.type }))
            };
            baseInstruction += ' You are speaking to an advisor. Help them manage their leads and client requests.';
            break;
        case Role.Underwriter:
            const pendingPolicies = (db.clients || []).flatMap((c: any) => (c.policies || []).filter((p: any) => p.status === 'Pending').map((p: any) => ({...p, clientName: c.name})));
            contextData = { pendingPolicies };
            baseInstruction += ' You are speaking to an underwriter. Help them review pending policies and assess risk.';
            break;
        case Role.Admin:
        case Role.Manager:
            const newApplications = (db.agentApplications || []).filter((app: any) => app.status === 'Pending');
            contextData = { 
                metrics: { totalLeads: db.leads.length, totalClients: (db.clients || []).length },
                pendingAgentApplications: newApplications.map((app: any) => ({ name: app.name, submittedAt: app.submittedAt }))
            };
            baseInstruction += ` You are speaking to a ${role}. Provide high-level summaries and insights about the team's performance and pending administrative tasks.`;
            break;
        case Role.SubAdmin:
             const declinedLeads = db.leads.filter((l: any) => l.status === 'Declined');
             contextData = { 
                leadsToReevaluate: declinedLeads.map((l: any) => ({ name: l.name, declineReason: l.declineReason }))
             };
             baseInstruction += ' You are speaking to a sub-admin. Help them manage lead distribution, focusing on leads that have been declined.';
             break;
    }

    const contextString = JSON.stringify(contextData);
    return `${baseInstruction}\n\nHere is a snapshot of relevant data from the CRM:\n${contextString}`;
}


// --- API Routes with Error Handling ---

// POST to generate a social media post
app.post('/api/generate-social-post', async (req, res) => {
    if (!ai) {
        return res.status(503).json({ message: 'Generative AI service is not configured. API_KEY is missing.' });
    }

    try {
        const { topic } = req.body;
        if (!topic || typeof topic !== 'string' || topic.trim() === '') {
            return res.status(400).json({ message: 'A valid topic is required.' });
        }

        const prompt = `You are a social media manager for New Holland Financial, an insurance company. Write an engaging social media post about the provided topic. The post should be concise, professional, and include relevant hashtags. Topic: ${topic}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const postText = response.text;
        res.json({ post: postText });

    } catch (error: any) {
        console.error('Error in /api/generate-social-post:', error);
        const errorMessage = error.message || 'Failed to generate social media post.';
        res.status(500).json({ message: errorMessage });
    }
});

// --- NEW AI Routes ---
app.post('/api/summarize-lead', async (req, res) => {
    if (!ai) {
        return res.status(503).json({ message: 'AI service is not configured. API_key is missing.' });
    }

    try {
        const leadData = req.body;
        
        // Sanitize data before sending to AI - exclude sensitive info
        const { ssn, accountNumber, routingNumber, ...sanitizedLeadData } = leadData;

        const prompt = `
            You are an expert assistant for an insurance advisor at New Holland Financial Group.
            Summarize the following lead information into concise, easy-to-read bullet points.
            Focus on the most important details an advisor needs for a first contact.
            Do not mention any fields that are empty or not provided.

            Lead Information:
            ${JSON.stringify(sanitizedLeadData, null, 2)}
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        res.json({ summary: response.text });
    } catch (error: any) {
        console.error('Error in /api/summarize-lead:', error);
        res.status(500).json({ message: 'Failed to generate lead summary.' });
    }
});

app.post('/api/analyze-underwriting-risk', async (req, res) => {
    if (!ai) {
        return res.status(503).json({ message: 'AI service is not configured. API_key is missing.' });
    }

    try {
        const { client, policy } = req.body;
        
        // Sanitize data - exclude sensitive or irrelevant data for risk analysis
        const { email, phone, policies, since, ssn, ...sanitizedClient } = client;
        const sanitizedData = { client: sanitizedClient, policy };
        
        const prompt = `
            You are an expert insurance underwriter for New Holland Financial Group.
            Analyze the following client profile and their pending policy application for potential risks.
            Provide a detailed risk analysis. Structure your analysis with two clear headings:
            1.  **Potential Risks**: List and explain potential underwriting risks based on the provided data (e.g., client details, policy type, premium, status). Be specific.
            2.  **Recommendations for Review**: Suggest specific areas that require further investigation or documentation from the client or agent.

            Client and Policy Data:
            ${JSON.stringify(sanitizedData, null, 2)}
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
        });

        res.json({ analysis: response.text });

    } catch (error: any) {
        console.error('Error in /api/analyze-underwriting-risk:', error);
        res.status(500).json({ message: 'Failed to generate risk analysis.' });
    }
});

app.post('/api/ai-chat', async (req, res) => {
    if (!ai) {
        return res.status(503).json({ message: 'AI service is not configured. API_KEY is missing.' });
    }

    try {
        const { messages, role, userId } = req.body;

        if (!messages || !Array.isArray(messages) || messages.length === 0 || !role || !userId) {
            return res.status(400).json({ message: 'Missing required parameters: messages, role, userId.' });
        }

        const db = await readDb();
        const systemInstruction = await getSystemInstructionForRole(role, userId, db);

        const formattedHistory = messages.map((msg: { role: 'user' | 'model', text: string }) => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }));

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: formattedHistory,
            config: {
                systemInstruction,
            },
        });

        res.json({ text: response.text });

    } catch (error: any) {
        console.error('Error in /api/ai-chat:', error);
        res.status(500).json({ message: 'Failed to get AI response.' });
    }
});


app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { cartItems } = req.body;

        if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ message: 'Invalid cart items provided.' });
        }

        // In a real application, you should fetch product prices from your database
        // to prevent price manipulation on the client-side.
        const amount = cartItems.reduce((total, item: any) => {
            // Basic validation for item structure
            if (typeof item.price !== 'number' || typeof item.quantity !== 'number' || item.price <= 0 || item.quantity <= 0) {
                throw new Error(`Invalid item in cart: ${item.name}`);
            }
            return total + item.price * item.quantity;
        }, 0);

        // Convert to cents
        const amountInCents = Math.round(amount * 100);

        if (amountInCents <= 0) {
            return res.status(400).json({ message: 'Invalid cart total.' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error: any) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ message: error.message });
    }
});



// GET all core services
app.get('/api/services', async (req, res) => {
    try {
        const db = await readDb();
        res.json(db.core_services);
    } catch (error) {
        console.error('Error in /api/services:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET service details by name
app.get('/api/services/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const db = await readDb();
        const key = name.replace('-', '_'); // Handle "group-benefits"
        if (db.service_details[key]) {
            res.json(db.service_details[key]);
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        console.error(`Error in /api/services/${req.params.name}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET all advisors
app.get('/api/advisors', async (req, res) => {
    try {
        const db = await readDb();
        res.json(db.advisors);
    } catch (error) {
        console.error('Error in /api/advisors:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// ADD a new advisor
app.post('/api/advisors', async (req, res) => {
    try {
        const newAdvisor = req.body;
        if (!newAdvisor || !newAdvisor.name || !newAdvisor.title) {
            return res.status(400).json({ message: 'Missing required advisor fields.' });
        }
        const db = await readDb();
        const newId = (db.advisors.reduce((maxId: number, advisor: any) => Math.max(advisor.id, maxId), 0) || 0) + 1;
        const advisorToAdd = { id: newId, ...newAdvisor };
        db.advisors.push(advisorToAdd);
        await writeDb(db);
        res.status(201).json(advisorToAdd);
    } catch (error) {
        console.error('Error in POST /api/advisors:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET a single advisor
app.get('/api/advisors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await readDb();
        const advisor = db.advisors.find((a: any) => a.id === parseInt(id, 10));
        if (advisor) {
            res.json(advisor);
        } else {
            res.status(404).json({ message: 'Advisor not found' });
        }
    } catch (error) {
        console.error('Error in GET /api/advisors/:id:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// UPDATE an advisor
app.put('/api/advisors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAdvisor = req.body;
        const db = await readDb();
        const index = db.advisors.findIndex((a: any) => a.id === parseInt(id, 10));
        if (index > -1) {
            db.advisors[index] = { ...db.advisors[index], ...updatedAdvisor, id: parseInt(id, 10) };
            await writeDb(db);
            res.json(db.advisors[index]);
        } else {
            res.status(404).json({ message: 'Advisor not found' });
        }
    } catch (error) {
        console.error('Error in PUT /api/advisors/:id:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE an advisor
app.delete('/api/advisors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await readDb();
        const initialLength = db.advisors.length;
        db.advisors = db.advisors.filter((a: any) => a.id !== parseInt(id, 10));
        if (db.advisors.length < initialLength) {
            await writeDb(db);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Advisor not found' });
        }
    } catch (error) {
        console.error('Error in DELETE /api/advisors/:id:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// POST a new quote
app.post('/api/quotes', async (req, res) => {
    try {
        const newQuote = { id: randomUUID(), ...req.body, timestamp: new Date().toISOString() };
        const db = await readDb();
        db.quotes.push(newQuote);
        await writeDb(db);
        // Simulate a small delay
        setTimeout(() => {
            res.status(201).json({ message: 'Quote submitted successfully!', quote: newQuote });
        }, 1000);
    } catch (error) {
        console.error('Error in /api/quotes:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST a new callback request
app.post('/api/callbacks', async (req, res) => {
    try {
        const newCallback = { id: randomUUID(), ...req.body, timestamp: new Date().toISOString() };
        const db = await readDb();
        db.callbacks.push(newCallback);
        await writeDb(db);
         // Simulate a small delay
        setTimeout(() => {
            res.status(201).json({ message: 'Callback requested successfully!', callback: newCallback });
        }, 1000);
    } catch (error) {
        console.error('Error in /api/callbacks:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// --- Static File Serving ---
// This should come after API routes to avoid conflicts
app.use(express.static(STATIC_PATH));

// Catch-all to serve index.html for any other request (for client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(STATIC_PATH, 'index.html'));
});

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});