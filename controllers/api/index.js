const router = require('express').Router();

const userRoutes = require('./user-routes');
const birdRoutes = require('./bird-routes');
const cardRoutes = require('./card-routes')

router.use('/users', userRoutes);
router.use('/birds', birdRoutes);
router.use('/cards', cardRoutes)

module.exports = router;