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


// Signup Strategy ||  User Creation
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password', 
    passReqToCallback: true
  }, function(req, email, password, done) {

    // Next lines are for email validation using express-validator package
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty().isLength({min: 4});
    let errors = req.validationErrors();

    if (errors) {
      var messages = [];
      errors.forEach(function(error) {
        messages.push(error.msg);
      });

      return done(null, false, req.flash('error', messages));
    } // validation end

    User.findOne({'email': email}, function(err, user) {

          if (err) {
            return done(err);
          } 

          if (user) {
            return done(null, false, {message: "This Email is already in use."});
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

// Signin Strategy
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password', 
    passReqToCallback: true
}, function(req, email, password, done) {
  
    // Next lines are for email validation using express-validator package
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty();
    let errors = req.validationErrors();

    if (errors) {
      var messages = [];
      errors.forEach(function(error) {
        messages.push(error.msg);
      });

      return done(null, false, req.flash('error', messages));
    } // validation end

    User.findOne({'email': email}, function(err, user) {

          if (err) {
            return done(err);
          } 

          if (!user) {
            return done(null, false, {message: "No user found."});
            // null = no error appeared
            // but it's also not successful. So false = not success
          }

          if (!user.validPassword(password)){
            return done(null, false, {message: "Wrong Password"});
          }

         return done(null, user);
      });
}));
