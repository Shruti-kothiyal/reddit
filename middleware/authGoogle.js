const User = require("../model/user");
var GooglePlusTokenStrategy = require("passport-google-plus-token");
const passport  =require("passport")


// Google Plus Strategy
const googleConfig = {
  clientID: "211583878725-6eh6j2cggcjp0c976ev266o97gc24evd.apps.googleusercontent.com", // client id
  clientSecret: "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", // client secret
};
const googleStrategy = new GooglePlusTokenStrategy(
  googleConfig,
  async (accessToken, refreshToken, profile, done) => {
    //console.log("Profile ------> ",profile)
    try {
      const user = await User.findOne({ email: profile.emails[0].value });
      if (user===null) {
        const newUser = await User.create({
          email: profile.emails[0].value,
          username: profile.displayName,
          status: 1,
        });
        await newUser.save().then((savedUser)=>{
            console.log("savedUser",savedUser)
        })
        return done(null, newUser);
      }else{
        console.log("User --->",user)
      }
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  }
);
passport.use(googleStrategy);
const authGoogle= passport.authenticate("google-plus-token", {session: false})
module.exports=authGoogle;