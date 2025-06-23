const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your MongoDB URI (use dotenv in production)
const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-connection-string';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Middleware
app.use(cors());
app.use(express.json());

// Schema and Model
const noteSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Note = mongoose.model('Note', noteSchema);

// Routes
app.get('/api/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.post('/api/notes', async (req, res) => {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
});

app.put('/api/notes/:id', async (req, res) => {
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
