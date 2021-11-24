
exports.seed = async function(knex) {
  // Inserts seed entries
  return await knex('movies').insert([
        {title:'Titanic',year: 1998 ,gender:'Drama'},
        {title:'Avenger: Endgame',year: 2018 ,gender:'Ciencia Ficción'},
        {title:'El Codigo Enigma',year: 2014 ,gender:'Belico/Drama'}
  ]);
};