// Update with your config settings.
const {knexSnakeCaseMappers} = require('objection');

module.exports = {
  
  development: {
    client: 'mysql2',
    connection: {
      database: 'db-devops',
      user:'root',
      password:'1234'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds:{
      directory: './seeds'
    },
    ...knexSnakeCaseMappers,
  },

  /* production: {
    client: 'mysql2',
    connection: {
      database: 'db-devops',
      user:     'root',
      password: '1234'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  } */


};
