const express   = require('express');
const router    = express.Router();
const Products  = require('../models/products');
const csrf      = require('csurf');

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
 res.render('user/signup', {csrfToken: req.csrfToken()});
});

router.post('/user/signup', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
