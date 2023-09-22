// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/userModels');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// This is a middleware function that configures Passport for local authentication
/*const localization = (passport) => {
  // Configure Passport to use the LocalStrategy for authentication
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // Specify the field name for the username (assumed to be 'email' in this case)
        passwordField: 'password', // Specify the field name for the password (assumed to be 'password' in this case)
      },
      // This is the callback function executed when a user attempts to log in
      function (email, password, done) {
        // Find a user in the database based on the provided email
        User.findOne({ email: email }, function (err, user) {
          if (err) {
            // If there's an error, return the error to Passport
            return done(err);
          }
          if (!user) {
            // If no user is found with the provided email, return 'false' to indicate failed authentication
            // Also, include a message that will be available to handle authentication failure on the client side
            return done(null, false, { message: 'Incorrect email or password' });
          }
          // If a user is found, compare the provided password with the stored hashed password
          if (!bcrypt.compareSync(password, user.password)) {
            // If the passwords don't match, return 'false' to indicate failed authentication
            // Also, include a message that will be available to handle authentication failure on the client side
            return done(null, false, { message: 'Incorrect email or password' });
          }
          // If both email and password are correct, return the user object to indicate successful authentication
          return done(null, user);
        });
      }
    )
  );

  // Serialize user: Store user information in the session
  passport.serializeUser(function(user, done) {
    // The 'user.id' value will be stored in the session for subsequent requests
    done(null, user.id);
  });

  // Deserialize user: Retrieve user information from the session
  passport.deserializeUser(function(id, done) {
    // Retrieve the user from the database based on the 'id' stored in the session
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
*/
const localization = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      console.log(username + " " + password)
      let userdata = await User.findOne({ name: username });
      console.log(userdata.password)
      try {
        // if (!userdata) return done(null, false);
        if (bcrypt.compare(password, userdata.password)) {
          console.log("bcrypt block");
          // If the passwords don't match, return 'false' to indicate failed authentication
          // Also, include a message that will be available to handle authentication failure on the client side
          return done(null, userdata);
        }
        // if (userdata.password !== password) return done(null, false);
         else return done(null, false, { message: 'Incorrect email or password' });
      } catch (error) {
        console.log("catch blocked");
        return done(error, false);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let data = await User.findOne({id});
    done(null, data);
  });
}


module.exports = localization;
