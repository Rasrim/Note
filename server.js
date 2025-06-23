const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(cors());
app.use(express.json());

// Note Schema
const noteSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Note = mongoose.model('Note', noteSchema);

// ROUTES
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

// ✅ Make sure this is at the bottom
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
