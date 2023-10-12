var GoogleStrategy = require('passport-google-oauth20').Strategy;
let User = require('./userModels')
 
passport.use(new GoogleStrategy({
    clientID: '433576028180-kc8m0llervovpco730bk8jcb0dggo4vj.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));