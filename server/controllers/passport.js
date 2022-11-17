var GoogleStrategy = require("passport-google-oauth2").Strategy;
var TwitterStrategy=require("passport-twitter")
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require("../model/user");
const passport = require("passport");
require("dotenv").config()

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientID, // client id
      clientSecret: process.env.googleClientSecret, // client secret
      callbackURL: "http://localhost:3000/api/user/google/callback",
      // passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log("Profileeee ---->",profile)
      const user = await User.findOne({ email: profile.emails[0].value });
      if (user === null) {
        const newUser = await User.create({
          email: profile.emails[0].value,
          username: profile.displayName,
          status: 1,
        });
        await newUser.save().then((savedUser) => {
          console.log("savedUser", savedUser);
        });
        return done(null, newUser);
      } else {
        console.log("User --->", user);
      }
    }
  )
);

passport.use(new TwitterStrategy({
  consumerKey: process.env.twitterConsumerKey,
  consumerSecret: process.env.twitterConsumerSecret,
  callbackURL: "http://localhost:3000/api/user/twitter/callback"
},
async function(token, tokenSecret, profile, cb) {
  const user = await User.findOne({ email: profile.username });
      if (user === null) {
        const newUser = await User.create({
          email: profile.username,
          username: profile.displayName,
          status: 1,
        });
        await newUser.save().then((savedUser) => {
          console.log("savedUser", savedUser);
        });
        return cb(null, newUser);
      } else {
        console.log("User --->", user);
      }
  }
));

passport.use(new FacebookStrategy({
  clientID: process.env.facebookClientID,
  clientSecret: process.env.facebookClientSecret,
  callbackURL: "http://localhost:3000/api/user/facebook/callback"
},
async function(accessToken, refreshToken, profile, cb) {
  console.log("PROFILE =======> ",profile)
  const user = await User.findOne({ email: profile.emails[0].value });
  console.log("USER ====> ",user)
      if (user === null) {
        const newUser = await User.create({
          email: profile.emails[0].value,
          username: profile.displayName,
          status: 1,
        });
        await newUser.save().then((savedUser) => {
          console.log("savedUser", savedUser);
        });
        return done(null, newUser);
      } else {
        console.log("User --->", user);
      }
}
));