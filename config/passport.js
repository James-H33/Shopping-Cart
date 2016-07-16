const passport       = require('passport');
const User           = require('../models/user');
const LocalStrategy  = require('passport-local').Strategy;  // .Strategy === Strategy Object

// Tell passport how to store User
passport.serializeUser(function(user, done) {
    done(null, user.id); //stores user by id which can also be called by that id
    // null is where the err would normally be
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
});

// passport.use is a method of passport itself || Signup Strategy ||  User Creation
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password', 
    passReqToCallback: true
  }, function(req, email, password, done) {
      User.findOne({'email': email}, function(err, user) {

          if (err) {
            return done(err);
          } 

          if (user) {
            done(null, false, {message: "This Email is already in use."});
            // null = no error appeared
            // but it's also not successful. So false = not success
          }

          var newUser = new User();
          newUser.email = email; //  email refers to email from callback above
          newUser.password = newUser.encryptPassword(password); // password refers to password from callback above
          newUser.save(function(err, result) {
            if (err) {
              return done(err);
            } 
            return done(null, newUser);
          });
      });
}));