const express   = require('express');
const router    = express.Router();

// Import Models
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


module.exports = router;
