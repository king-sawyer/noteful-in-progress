const FoldersService = {
  getAllFolders(knex) {
    return knex.select("*").from("folders");
  },
  addFolder(knex, title) {
    return knex
      .insert(title)
      .into("folders")
      .returning("*")
      .then((rows) => {
        return rows[0], console.log(row[0]);
      });
  },
};

module.exports = FoldersService;
