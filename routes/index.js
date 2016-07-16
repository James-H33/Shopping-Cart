const express   = require('express');
const router    = express.Router();
const csrf      = require('csurf');
const passport  = require('passport');

// Import Models
const Products  = require('../models/products');

// CSurf method to var 
const csrfProtection = csrf(); 

// After setting up express-session we tell express to use csrfProtection
router.use(csrfProtection);

router.get('/', function(req, res, next) {
    Products.find({}, function(err, docs) {
      let productChunks = [];
      let chunkSize = 3;
      for (var i = 0; i < docs.length; i += chunkSize) {
        productChunks.push(docs.slice(i, i + chunkSize));
      }
      res.render('shop/index', {title: 'Express', products: productChunks});
    });
});

router.get('/user/signup', function(req, res, next) {
    let messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/user/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile', 
    failureRedirect: '/user/signup', 
    failureFlash: true
}));

router.get('/user/profile', function(req, res, next) {
    res.render('user/profile.ejs');
});

module.exports = router;
