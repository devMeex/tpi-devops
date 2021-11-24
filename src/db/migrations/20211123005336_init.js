
exports.up = async function(knex) {
  return await knex.schema.createTable('movies', (table)=>{
    table.increments('id').notNullable().primary()
    table.string('title')
    table.string('year')
    table.string('gender')
  })
};

exports.down = async function(knex) {
    return await knex.schema.dropTableIfExists('movies');
};
