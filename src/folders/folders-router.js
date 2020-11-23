const path = require("path");
const express = require("express");
const xss = require("xss");
const FoldersService = require("./folders-service");
const NotesService = require("../notes/notes-service");

const foldersRouter = express.Router();
const jsonParser = express.json();

foldersRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    FoldersService.getAllFolders(knexInstance)
      .then((folders) => {
        res.json(folders);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const title = req.body.title;
    const newFolder = title;
    console.log(newFolder);
    if (!title) {
      return res.status(404).json({
        error: { message: `Must include a title in request body` },
      });
    }
    FoldersService.addFolder(req.app.get("db"), title)
      .then((title) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl + `/${title.id}`))
          .json(title);
      })
      .catch(next);
  });

module.exports = foldersRouter;
