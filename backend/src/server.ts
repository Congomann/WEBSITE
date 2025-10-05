import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs/promises';

const app = express();
const PORT = process.env.PORT || 3001;
// Since tsconfig.json specifies "module": "commonjs", __dirname is globally
// available in the compiled JavaScript and provides the path to the current directory.
const DB_PATH = path.join(__dirname, '..', 'db.json');

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

// --- API Routes ---

// GET all core services
app.get('/api/services', async (req, res) => {
    const db = await readDb();
    res.json(db.core_services);
});

// GET service details by name
app.get('/api/services/:name', async (req, res) => {
    const { name } = req.params;
    const db = await readDb();
    if (db.service_details[name]) {
        res.json(db.service_details[name]);
    } else {
        res.status(404).json({ message: 'Service not found' });
    }
});

// GET all advisors
app.get('/api/advisors', async (req, res) => {
    const db = await readDb();
    res.json(db.advisors);
});

// ADD a new advisor
app.post('/api/advisors', async (req, res) => {
    const newAdvisor = req.body;
    const db = await readDb();
    const newId = db.advisors.length > 0 ? Math.max(...db.advisors.map((a: any) => a.id)) + 1 : 1;
    db.advisors.push({ ...newAdvisor, id: newId });
    await writeDb(db);
    res.status(201).json({ ...newAdvisor, id: newId });
});

// DELETE an advisor
app.delete('/api/advisors/:id', async (req, res) => {
    const { id } = req.params;
    const db = await readDb();
    db.advisors = db.advisors.filter((a: any) => a.id !== parseInt(id, 10));
    await writeDb(db);
    res.status(204).send();
});


// GET all videos
app.get('/api/resources/videos', async (req, res) => {
    const db = await readDb();
    res.json(db.youtube_videos);
});

// ADD a new video
app.post('/api/resources/videos', async (req, res) => {
    const newVideo = req.body;
    const db = await readDb();
    db.youtube_videos.push(newVideo);
    await writeDb(db);
    res.status(201).json(newVideo);
});

// DELETE a video
app.delete('/api/resources/videos/:id', async (req, res) => {
    const { id } = req.params;
    const db = await readDb();
    db.youtube_videos = db.youtube_videos.filter((v: any) => v.id !== id);
    await writeDb(db);
    res.status(204).send();
});


// GET all documents
app.get('/api/resources/documents', async (req, res) => {
    const db = await readDb();
    res.json(db.document_resources);
});

// ADD a new document
app.post('/api/resources/documents', async (req, res) => {
    const newDocument = req.body;
    const db = await readDb();
    const newId = `doc-${crypto.randomUUID()}`;
    db.document_resources.push({ ...newDocument, id: newId });
    await writeDb(db);
    res.status(201).json({ ...newDocument, id: newId });
});

// DELETE a document
app.delete('/api/resources/documents/:id', async (req, res) => {
    const { id } = req.params;
    const db = await readDb();
    db.document_resources = db.document_resources.filter((d: any) => d.id !== id);
    await writeDb(db);
    res.status(204).send();
});


// POST a new quote
app.post('/api/quotes', async (req, res) => {
    const newQuote = req.body;
    const db = await readDb();
    db.quotes.push({ ...newQuote, id: Date.now(), submittedAt: new Date().toISOString() });
    await writeDb(db);
    res.status(201).json({ message: 'Quote submitted successfully!' });
});


// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});