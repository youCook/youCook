const express = require('express');
const router  = express.Router();

const authRoutes = require('./auth.routes');
router.use('/', authRoutes);

const userRoutes = require('./user.routes');
router.use('/user', userRoutes);

const postRoutes = require('./post.routes');
router.use('/post', postRoutes);

const plannerRoutes = require('./planner.routes');
router.use('/planner', plannerRoutes);


/* GET home page */
router.get('/', (req, res, next) => {
  res.redirect('/post');
});


module.exports = router;
