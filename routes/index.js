const express   = require('express');
const router    = express.Router();
const Cart      = require('../models/cart');
const Products  = require('../models/products');

// Home
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

router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  // Create New Cart || If a Cart exists within session then use that cart else pass an empty object to start fresh
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Products.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/');
    } 
    cart.add(product, product.id); // Add new product to cart.
    req.session.cart = cart; // Store Cart with global cart within session.
    res.redirect('/');
  });
});

router.get('/shopping-cart', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', {products: null});
  }

  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
});

router.get('/checkout', function(req, res, next) {
  if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
  var cart = new Cart(req.session.cart);
  res.render('shop/checkout', {total: cart.totalPrice})
});


module.exports = router;
