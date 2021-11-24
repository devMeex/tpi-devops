const { Model } = require('objection');

class Movie extends Model {
  static get tableName() {
    return 'movies';
  }
}

module.exports = Movie;