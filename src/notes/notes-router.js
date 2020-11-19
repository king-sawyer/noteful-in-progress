const path = require("path");
const express = require("express");
const xss = require("xss");
const NotesService = require("./notes-service");

const notesRouter = express.Router();
const jsonParser = express.json();

notesRouter.route("/").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  NotesService.getAllNotes(knexInstance)
    .then((notes) => {
      res.json(notes);
    })
    .catch(next);
});

notesRouter.route("/").post(jsonParser, (req, res, next) => {
  const { title, content, folder_id } = req.body;
  const newNote = { title, content, folder_id };

  //   if (!title) {
  //     return res.status(400).json({
  //       error: { message: `Must include a title` },
  //     });
  //   }

  for (const [key, value] of Object.entries(newNote)) {
    if (value == null) {
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` },
      });
    }
  }

  NotesService.insertNote(req.app.get("db"), newNote)
    .then((note) => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl + `/${note.id}`))
        .json(note);
    })
    .catch(next);
});

module.exports = notesRouter;
