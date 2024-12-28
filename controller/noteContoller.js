const Note = require("../models/noteSchema");

// Regex for validating subject input
const subjectRegex = /^[a-zA-Z0-9\s]+$/;

// .......................createNote........................................
const createNote = async (req, res) => {
  try {
    const body = req.body;
    const { subject } = body;

    if (!subjectRegex.test(subject)) {
      return res.status(400).json({ message: "Invalid subject format" });
    }

    const note = new Note(body);
    await note.save();
    res.status(200).json({ message: "Note created successfully", note });
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

// .................................getNotes...................................
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate("createdBy lastEditedBy collaborators", "displayName email");
    res.status(200).json({ message: "Notes fetched successfully", notes });
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

// ............................getNoteById......................................
const getNoteByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const notes = await Note.find({ createdBy: userId });
    res.status(200).json({ message: "Note fetched successfully", notes });
  } catch (err) {
    res.status(404).json({ message: "An error occurred", error: err.message });
  }
};

// ...........................deleteNote......................................
const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

// ...........................updateNote......................................
const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = {
      ...req.body,
      lastEditedBy: req.body.lastEditedBy,
      lastEditedAt: new Date(),
    };

    const note = await Note.findByIdAndUpdate(id, updates, { new: true });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note updated successfully", note });
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

// .............................searchNotesBySubject................................
const searchNotesBySubject = async (req, res) => {
  try {
    const subject = req.query.subject;
    const notes = await Note.find({ subject: { $regex: subject, $options: 'i' } });
    res.status(200).json({ message: "Note fetched successfully", notes });
  } catch (err) {
    res.status(404).json({ message: "An error occurred", error: err.message })
  }
};
module.exports = {
  createNote,
  getNotes,
  getNoteByUserId,
  deleteNote,
  updateNote,
  searchNotesBySubject,
};
