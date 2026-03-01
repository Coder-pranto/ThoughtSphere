const express = require('express');
const router = express.Router();
const rateLimiter = require('../middleware/rateLimiter');

const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require('../controllers/notesController');

router.get('/', getAllNotes);
router.get('/:id', getNoteById);

router.post('/', rateLimiter, createNote);
router.patch('/:id', rateLimiter, updateNote);
router.delete('/:id', rateLimiter, deleteNote);


module.exports = router;
