import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs/promises';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';

const app = express();
const PORT = process.env.PORT || 3001;

// Define __dirname for ES Modules to ensure robust path resolution.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct an absolute path to db.json. This version assumes the db.json file
// is located in the same directory as the compiled server.js, which can be
// a more robust path in complex build environments.
const DB_PATH = path.join(__dirname, 'db.json');
const STATIC_PATH = path.join(__dirname, '..', '..', '..');


const stripe = new Stripe('sk_test_51SGWYuAyRjRzCXot6TLt1NcVnZXiknLKaT2t2ZJvXC3Rq9rZCaQKDtzKBQ5aspDlxoFDZfjou2to8mAhjWWTxvEI00dSlrfjgc', {
  apiVersion: '2024-06-20',
});

// --- Middleware ---
app.use(cors());
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

// Simple validation middleware (example for a product)
const validate = (schema: any) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { body } = req;
    const errors: string[] = [];
    for (const key in schema) {
        if (schema[key].required && !body[key]) {
            errors.push(`${key} is required.`);
        }
        if (schema[key].type && typeof body[key] !== schema[key].type) {
            errors.push(`${key} must be of type ${schema[key].type}.`);
        }
    }
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    }
    next();
};

const productSchema = {
    name: { required: true, type: 'string' },
    price: { required: true, type: 'number' },
    imageUrl: { required: true, type: 'string' },
    description: { required: true, type: 'string' },
};


// --- API Routes ---

// GET ALL SITE DATA
app.get('/api/all-data', async (req, res) => {
    try {
        const db = await readDb();
        res.json({
            core_services: db.core_services,
            service_details: db.service_details,
            advisors: db.advisors,
            video_resources: db.video_resources,
            document_resources: db.document_resources,
            commissions: db.commissions,
            leads: db.leads,
            clients: db.clients,
            tasks: db.tasks,
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// PAYMENT INTENT
app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { cartItems } = req.body;
        if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ message: 'Invalid cart items provided.' });
        }

        const db = await readDb();
        const serverProducts = db.products;
        
        let amount = 0;
        for (const cartItem of cartItems) {
            const serverProduct = serverProducts.find((p: any) => p.id === cartItem.id);
            if (!serverProduct) {
                return res.status(400).json({ message: `Product with ID ${cartItem.id} not found.` });
            }
            if (typeof cartItem.quantity !== 'number' || cartItem.quantity <= 0) {
                 return res.status(400).json({ message: `Invalid quantity for product ${cartItem.name}` });
            }
            amount += serverProduct.price * cartItem.quantity;
        }

        const amountInCents = Math.round(amount * 100);
        if (amountInCents <= 0) {
            return res.status(400).json({ message: 'Invalid cart total.' });
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
        });
        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// ADVISORS - GET, POST, PUT, DELETE
app.get('/api/advisors', async (req, res) => {
    const db = await readDb();
    res.json(db.advisors);
});
app.post('/api/advisors', async (req, res) => {
    const newAdvisor = req.body;
    const db = await readDb();
    const newId = (db.advisors.length > 0 ? Math.max(...db.advisors.map((a: any) => a.id)) : 0) + 1;
    const advisorToAdd = { ...newAdvisor, id: newId };
    db.advisors.push(advisorToAdd);
    await writeDb(db);
    res.status(201).json(advisorToAdd);
});
app.put('/api/advisors/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const db = await readDb();
    const index = db.advisors.findIndex((a: any) => a.id === parseInt(id, 10));
    if (index === -1) return res.status(404).json({ message: 'Advisor not found' });
    db.advisors[index] = { ...db.advisors[index], ...updatedData };
    await writeDb(db);
    res.json(db.advisors[index]);
});
app.delete('/api/advisors/:id', async (req, res) => {
    const { id } = req.params;
    const db = await readDb();
    db.advisors = db.advisors.filter((a: any) => a.id !== parseInt(id, 10));
    await writeDb(db);
    res.status(204).send();
});

// RESOURCES (VIDEOS) - GET, POST, PUT, DELETE
app.get('/api/resources/videos', async (req, res) => {
    const db = await readDb();
    res.json(db.video_resources);
});
app.post('/api/resources/videos', async (req, res) => {
    const newVideo = req.body;
    const db = await readDb();
    const videoToAdd = { ...newVideo, id: `vid-${randomUUID()}` };
    db.video_resources.push(videoToAdd);
    await writeDb(db);
    res.status(201).json(videoToAdd);
});
app.put('/api/resources/videos/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const db = await readDb();
    const index = db.video_resources.findIndex((v: any) => v.id === id);
    if (index === -1) return res.status(404).json({ message: 'Video not found' });
    db.video_resources[index] = { ...db.video_resources[index], ...updatedData };
    await writeDb(db);
    res.json(db.video_resources[index]);
});
app.delete('/api/resources/videos/:id', async (req, res) => {
    const { id } = req.params;
    const db = await readDb();
    db.video_resources = db.video_resources.filter((v: any) => v.id !== id);
    await writeDb(db);
    res.status(204).send();
});

// RESOURCES (DOCUMENTS) - GET, POST, PUT, DELETE
app.get('/api/resources/documents', async (req, res) => {
    const db = await readDb();
    res.json(db.document_resources);
});
app.post('/api/resources/documents', async (req, res) => {
    const newDocument = req.body;
    const db = await readDb();
    const docToAdd = { ...newDocument, id: `doc-${randomUUID()}` };
    db.document_resources.push(docToAdd);
    await writeDb(db);
    res.status(201).json(docToAdd);
});
app.put('/api/resources/documents/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const db = await readDb();
    const index = db.document_resources.findIndex((d: any) => d.id === id);
    if (index === -1) return res.status(404).json({ message: 'Document not found' });
    db.document_resources[index] = { ...db.document_resources[index], ...updatedData };
    await writeDb(db);
    res.json(db.document_resources[index]);
});
app.delete('/api/resources/documents/:id', async (req, res) => {
    const { id } = req.params;
    const db = await readDb();
    db.document_resources = db.document_resources.filter((d: any) => d.id !== id);
    await writeDb(db);
    res.status(204).send();
});

// PRODUCTS - GET, POST, PUT, DELETE
app.get('/api/products', async (req, res) => {
    const db = await readDb();
    res.json(db.products || []);
});
app.post('/api/products', validate(productSchema), async (req, res) => {
    const newProduct = req.body;
    const db = await readDb();
    const newId = (db.products.length > 0 ? Math.max(...db.products.map((p: any) => p.id)) : 0) + 1;
    const productToAdd = { ...newProduct, id: newId };
    db.products.push(productToAdd);
    await writeDb(db);
    res.status(201).json(productToAdd);
});
app.put('/api/products/:id', validate(productSchema), async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const db = await readDb();
    const index = db.products.findIndex((p: any) => p.id === parseInt(id, 10));
    if (index === -1) return res.status(404).json({ message: 'Product not found' });
    db.products[index] = { ...db.products[index], ...updatedData };
    await writeDb(db);
    res.json(db.products[index]);
});
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const db = await readDb();
    db.products = db.products.filter((p: any) => p.id !== parseInt(id, 10));
    await writeDb(db);
    res.status(204).send();
});

// QUOTES & APPLICATIONS
app.post('/api/quotes', async (req, res) => {
    const newQuote = req.body;
    const db = await readDb();
    db.quotes.push({ ...newQuote, id: Date.now(), submittedAt: new Date().toISOString() });
    await writeDb(db);
    res.status(201).json({ message: 'Quote submitted successfully!' });
});
app.get('/api/agent-applications', async (req, res) => {
    const db = await readDb();
    res.json(db.agent_applications || []);
});
app.post('/api/agent-applications', async (req, res) => {
    const newApplication = req.body;
    const db = await readDb();
    if (!db.agent_applications) db.agent_applications = [];
    const newId = (db.agent_applications.length > 0 ? Math.max(...db.agent_applications.map((a: any) => a.id)) : 0) + 1;
    const appToAdd = { ...newApplication, id: newId, submittedAt: new Date().toISOString() };
    db.agent_applications.push(appToAdd);
    await writeDb(db);
    res.status(201).json({ message: 'Application submitted successfully!', application: appToAdd });
});
app.delete('/api/agent-applications/:id', async (req, res) => {
    const { id } = req.params;
    const db = await readDb();
    db.agent_applications = db.agent_applications.filter((a: any) => a.id !== parseInt(id, 10));
    await writeDb(db);
    res.status(204).send();
});

// TASKS - GET, POST, PUT, DELETE
app.get('/api/tasks', async (req, res) => {
    const db = await readDb();
    res.json(db.tasks || []);
});
app.post('/api/tasks', async (req, res) => {
    const newTaskData = req.body;
    const db = await readDb();
    const taskToAdd = { ...newTaskData, id: `T-${randomUUID()}` };
    db.tasks.push(taskToAdd);
    await writeDb(db);
    res.status(201).json(taskToAdd);
});
app.put('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const db = await readDb();
    const index = db.tasks.findIndex((t: any) => t.id === id);
    if (index === -1) return res.status(404).json({ message: 'Task not found' });
    db.tasks[index] = { ...db.tasks[index], ...updatedData };
    await writeDb(db);
    res.json(db.tasks[index]);
});
app.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const db = await readDb();
    db.tasks = db.tasks.filter((t: any) => t.id !== id);
    await writeDb(db);
    res.status(204).send();
});


// --- Static File Serving ---
app.use(express.static(STATIC_PATH));
app.get('*', (req, res) => {
    res.sendFile(path.join(STATIC_PATH, 'index.html'));
});

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});