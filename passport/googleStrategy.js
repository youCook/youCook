require('dotenv').config();
const passport      = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User          = require('../models/User');
const randToken = require("rand-token");


passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // to see the structure of the data in received response:
      console.log(profile._json.given_name)


      User.findOne({ googleID: profile.id })
        .then((user) => {
          if (user) {
            done(null, user);
            return;
          }

          User.create({ googleID: profile.id, email: profile._json.email, username: profile.name.givenName, imgPath: profile._json.picture, token: randToken.generate(25) })
            .then((newUser) => {
              done(null, newUser);
            })
            .catch(err => done(err)); // closes User.create()
        })
        .catch(err => done(err)); // closes User.findOne()
    },
  ),
);