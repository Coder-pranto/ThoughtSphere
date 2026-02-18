const { Note } = require('../models/Note');

const getAllNotes = async (_, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  if(notes.length === 0) return res.status(200).json({ message: 'No notes found!' });
  res.status(200).json(notes);
};

const getNoteById = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: 'Note not found!' });
  res.status(200).json(note);
};

const createNote = async (req, res) => {
  const { title, content } = req.body;
  const savedNote = await Note.create({ title, content });
  res.status(201).json(savedNote);
};

const updateNote = async (req, res) => {
  const { title, content } = req.body;
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true, runValidators: true },
  );
  if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
  res.status(200).json(updatedNote);
};

const deleteNote = async (req, res) => {
  const deletedNote = await Note.findByIdAndDelete(req.params.id);
  if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
  res.status(200).json({ message: 'Note deleted successfully!' });
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
