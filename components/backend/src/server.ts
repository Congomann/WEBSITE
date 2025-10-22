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

// --- API Routes with Error Handling ---

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
