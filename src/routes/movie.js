const router = require('express').Router();
const controller = require('../controllers/index');

router.get('/', controller.welcome);
router.get('/movies', controller.getMovies);
router.post('/movie',controller.addMovie);

module.exports = router;