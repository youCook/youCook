const express = require('express');
const router  = express.Router();

const authRoutes = require('./auth.routes');
router.use('/', authRoutes);
const userRoutes = require('./user.routes');
router.use('/user', userRoutes);
const plannerRoutes = require('./planner.routes');
router.use('/planner', plannerRoutes);

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


module.exports = router;
