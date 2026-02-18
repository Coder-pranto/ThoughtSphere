const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Note title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    content: {
      type: String,
      required: [true, 'Note content is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Named export
const Note = mongoose.model('Note', noteSchema);

module.exports = { Note };
