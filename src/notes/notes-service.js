const NotesService = {
  getAllNotes(knex) {
    return knex.select("*").from("notes");
  },
  insertNote(knex, newArticle) {
    return knex
      .insert(newArticle)
      .into("notes")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = NotesService;
