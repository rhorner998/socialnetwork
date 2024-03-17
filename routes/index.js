const router = require('express').Router();

const userRoutes = require('./userRoutes');
const throughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', throughtRoutes);

module.exports = router;
