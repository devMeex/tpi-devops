
exports.up = function(knex) {
  return knex.schema.table('movies', (table) => {
    table.float('rating',2,2);
  })
};

exports.down = function(knex) {
  return knex.schema.table('movies', (table) => {
    table.dropColumn('rating');
  })
};
