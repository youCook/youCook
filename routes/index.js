const express = require('express');
const router  = express.Router();

const authRoutes = require('./auth.routes');
router.use('/', authRoutes);
const userRoutes = require('./user.routes');
router.use('/user', userRoutes);

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
