const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const secure = require('../middlewares/secure.mid');
const uploadCloud = require('../configs/cloudinary.config');

router.get('/profile', secure.checkLogin, (req, res, next) => {
  res.render('user/profile', { user: req.user });
});
router.get('/edit', secure.checkLogin, (req, res, next) => {
  res.render('user/edit', { user: req.user });
});
router.post('/edit', secure.checkLogin, uploadCloud.single('imgPath'), (req, res, next) => {
  const {_id} = req.user;
  let {username, password, email, description } = req.body;
  if(req.file) {
    imgName= req.file.originalname;
    imgPath= req.file.url;
    User.findByIdAndUpdate(_id,  {$set: {imgPath: imgPath, imgName: imgName}}, {new:true})
    .then(user=> {
      res.redirect('/user/profile');
    }).catch(error => next(error));
  }
  else {
    User.findByIdAndUpdate(_id,  req.body, {new:true})
    .then(user=> {
      res.redirect('/user/profile');    
    }).catch(error => next(error));
  }

});
module.exports = router;
