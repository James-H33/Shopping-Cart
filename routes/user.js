const express   = require('express');
const router    = express.Router();
const csrf      = require('csurf');
const passport    = require('passport');


// CSurf method to var 
const csrfProtection = csrf(); 
// After setting up express-session we tell express to use csrfProtection
router.use(csrfProtection);



// User Profile || Must be placed above notLoggedIn Middleware
router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('user/profile');
});

router.get('/logout', isLoggedIn, function(req, res, next) {
    req.logout();
    res.redirect('/');
});

// Middleware Use
router.use('/', notLoggedIn, function(req, res, next) {
    next();
});

// User SignUp
router.get('/signup', function(req, res, next) {
    let messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

// User SignUp
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile', 
    failureRedirect: '/user/signup', 
    failureFlash: true
}));

router.get('/signin', function(req, res, next) {
    let messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile', 
    failureRedirect: '/user/signin', 
    failureFlash: true
}));


module.exports = router;

// Checks if Logged in and protects routes
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

// Checks if not Logged in and redirects
function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}