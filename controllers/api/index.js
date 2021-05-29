const router = require('express').Router();

const userRoutes = require('./user-routes');
const birdRoutes = require('./bird-routes')

router.use('/users', userRoutes);
router.use('/birds', birdRoutes);

module.exports = router;
