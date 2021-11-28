const knex = require("knex");
const knexfile = require("../knexfile");
const { Model } = require("objection");

function setupDb() {
    const db = knex(knexfile[process.env.NODE_ENV]);
    Model.knex(db);
}

module.exports = setupDb;