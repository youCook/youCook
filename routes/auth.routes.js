const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const randToken = require("rand-token");
const transporter = require("../configs/nodemailer.config");
const uploadCloud = require('../configs/cloudinary.config');
const confirmationEmail = require('../templates/template')
// const secure = require('../middlewares/secure.mid');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/login", (req, res, next) => {
  const user= req.user;
  res.render("auth/login", { user, message: req.flash("error") });
});

router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/signup", (req, res, next) => {
  const user= req.user;
  res.render("auth/signup", {user});
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", { message: "Indicate all fields" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const token = randToken.generate(25);

    const newUser = new User({
      username,
      password: hashPass,
      email,
      token
    });

    newUser.save().then(() => {
      transporter
        .sendMail({
          from: `'youCook Team' <${process.env.GMAIL_USER}>`,
          to: email,
          subject: `Welcome ${username}`,
          html: confirmationEmail(username, `<a href="https://localhost:3000/confirm/${newUser.token}"></a>`)
          // html: `<a href="http://localhost:3000/confirm/${newUser.token}">Confirmate your email, please 🗣</a>`
        })
        .then(() => {
          res.redirect("/");
        })
        .catch(err => {
          res.render("auth/signup", { message: "Something went wrong" });
        });
    });
  });
});

router.get("/confirm/:token", (req, res) => {
  User.findOneAndUpdate({token:req.params.token},{$set:{active: true}},{new: true})
  .then((user)=>{
    res.render("auth/activationSuccess",{user})
  }).catch(()=>{  
    console.log("Error de activacion")
  })
})

router.get("/checkmail", (req, res, next) => {
  res.render("auth/checkmail", { message: req.flash("error") });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/user/profile",
    failureRedirect: "/login"
  })
);
module.exports = router;