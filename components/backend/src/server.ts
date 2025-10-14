
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs/promises';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';

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
        const db = await readDb();
        const newId = db.advisors.length > 0 ? Math.max(...db.advisors.map((a: any) => a.id)) + 1 : 1;
        db.advisors.push({ ...newAdvisor, id: newId });
        await writeDb(db);
        res.status(201).json({ ...newAdvisor, id: newId });
    } catch (error) {
        console.error('Error in POST /api/advisors:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE an advisor
app.delete('/api/advisors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await readDb();
        db.advisors = db.advisors.filter((a: any) => a.id !== parseInt(id, 10));
        await writeDb(db);
        res.status(204).send();
    } catch (error) {
        console.error(`Error in DELETE /api/advisors/${req.params.id}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// GET all videos
app.get('/api/resources/videos', async (req, res) => {
    try {
        const db = await readDb();
        res.json(db.youtube_videos);
    } catch (error) {
        console.error('Error in /api/resources/videos:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// ADD a new video
app.post('/api/resources/videos', async (req, res) => {
    try {
        const newVideo = req.body;
        const db = await readDb();
        db.youtube_videos.push(newVideo);
        await writeDb(db);
        res.status(201).json(newVideo);
    } catch (error) {
        console.error('Error in POST /api/resources/videos:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE a video
app.delete('/api/resources/videos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await readDb();
        db.youtube_videos = db.youtube_videos.filter((v: any) => v.id !== id);
        await writeDb(db);
        res.status(204).send();
    } catch (error) {
        console.error(`Error in DELETE /api/resources/videos/${req.params.id}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// GET all documents
app.get('/api/resources/documents', async (req, res) => {
    try {
        const db = await readDb();
        res.json(db.document_resources);
    } catch (error) {
        console.error('Error in /api/resources/documents:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// ADD a new document
app.post('/api/resources/documents', async (req, res) => {
    try {
        const newDocument = req.body;
        const db = await readDb();
        const newId = `doc-${randomUUID()}`;
        db.document_resources.push({ ...newDocument, id: newId });
        await writeDb(db);
        res.status(201).json({ ...newDocument, id: newId });
    } catch (error) {
        console.error('Error in POST /api/resources/documents:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE a document
app.delete('/api/resources/documents/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await readDb();
        db.document_resources = db.document_resources.filter((d: any) => d.id !== id);
        await writeDb(db);
        res.status(204).send();
    } catch (error) {
        console.error(`Error in DELETE /api/resources/documents/${req.params.id}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// POST a new quote
app.post('/api/quotes', async (req, res) => {
    try {
        const newQuote = req.body;
        const db = await readDb();
        db.quotes.push({ ...newQuote, id: Date.now(), submittedAt: new Date().toISOString() });
        await writeDb(db);
        res.status(201).json({ message: 'Quote submitted successfully!' });
    } catch (error) {
        console.error('Error in POST /api/quotes:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET all agent applications
app.get('/api/agent-applications', async (req, res) => {
    try {
        const db = await readDb();
        res.json(db.agent_applications || []);
    } catch (error) {
        console.error('Error in /api/agent-applications:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST a new agent application
app.post('/api/agent-applications', async (req, res) => {
    try {
        const newApplication = req.body;
        const db = await readDb();
        if (!db.agent_applications) {
            db.agent_applications = [];
        }
        const newId = db.agent_applications.length > 0 ? Math.max(...db.agent_applications.map((a: any) => a.id)) + 1 : 1;
        const applicationToSave = { ...newApplication, id: newId, submittedAt: new Date().toISOString() };
        db.agent_applications.push(applicationToSave);
        await writeDb(db);
        res.status(201).json({ message: 'Application submitted successfully!', application: applicationToSave });
    } catch (error) {
        console.error('Error in POST /api/agent-applications:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE an agent application
app.delete('/api/agent-applications/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await readDb();
        db.agent_applications = db.agent_applications.filter((a: any) => a.id !== parseInt(id, 10));
        await writeDb(db);
        res.status(204).send();
    } catch (error) {
        console.error(`Error in DELETE /api/agent-applications/${req.params.id}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// --- Static File Serving ---
// Serve static files from the root of the project
app.use(express.static(STATIC_PATH));

// For any other request, serve index.html to support client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(STATIC_PATH, 'index.html'));
});


// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});