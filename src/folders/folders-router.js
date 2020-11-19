const path = require("path");
const express = require("express");
const xss = require("xss");
const FoldersService = require("./folders-service");

const foldersRouter = express.Router();
const jsonParser = express.json();

foldersRouter.route("/").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  FoldersService.getAllFolders(knexInstance)
    .then((notes) => {
      res.json(notes);
    })
    .catch(next);
});

module.exports = foldersRouter;
