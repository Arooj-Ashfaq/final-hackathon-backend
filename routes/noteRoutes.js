const express = require("express");
const {
  createNote,
  getNotes,
  getNoteByUserId,
  deleteNote,
  updateNote,
  searchNotesBySubject,
} = require("../controller/noteContoller");
const routes = express.Router();

routes.post("/", createNote);
routes.get("/:id", getNoteByUserId);
routes.get("/", getNotes);
routes.delete("/:id", deleteNote);
routes.patch("/:id", updateNote);
routes.get("/data/search", searchNotesBySubject)

module.exports = routes;
