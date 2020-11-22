const FoldersService = {
  getAllFolders(knex) {
    return knex.select("*").from("folders");
  },
  addFolder(knex, newFolder) {
    return knex
      .insert(newFolder)
      .into("folders")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = FoldersService;
