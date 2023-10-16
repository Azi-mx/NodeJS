const passport = require('passport')
let User = require('./userModels')
const rolemodel = require('./role')

var GoogleStrategy = require('passport-google-oauth20').Strategy;
 
passport.serializeUser((user , done) => { 
  done(null , user); 
}) 
passport.deserializeUser(function(user, done) { 
  done(null, user); 
}); 

passport.use(new GoogleStrategy({
    clientID: '433576028180-kc8m0llervovpco730bk8jcb0dggo4vj.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback: true
  },
  function(request,accessToken, refreshToken, profile, cb) {
    console.log(profile)
    User.findOrCreate({ googleId: profile.id }, function (err, user,created) {
      if(created) {
        
        user.created = true;
        user.profile = profile;
        // console.log("Created ",created);
        return cb(err, user);
      } else {
        user.created = false;
         console.log('Updated "%s"', user.googleId);
          return cb(err, user);
        
      }
    });
  }
));

const googleauthenticate = async (req,res)=>{
  let roleData1 = await rolemodel.find({isActive:1})
    console.log(req.user.profile)
    if(req.user.created){
        res.render('logindetails',{
          user:req.user.profile,
          roleData:roleData1,
          message:"You have been registered successfully."
        });
    } else {
        res.redirect('/admin/data');
    }
 }
 module.exports = googleauthenticate