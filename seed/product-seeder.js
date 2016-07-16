const Product = require('../models/products');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shopping_cart');

const products = [
  new Product({
    imagePath: 'http://cdn.idigitaltimes.com/sites/idigitaltimes.com/files/2016/06/13/battlefield-1-hands.jpg',
    title: 'BattleField 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 59.99
  }),
  new Product({
    imagePath: 'https://d1r7xvmnymv7kg.cloudfront.net/sites_products/darksouls3/assets/img/DARKSOUL_facebook_mini.jpg',
    title: 'Dark Souls 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 59.99
  }),
  new Product({
    imagePath: 'https://farm6.staticflickr.com/5624/23815901722_4d1edf4ed1_b.jpg',
    title: 'Uncharted 4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 59.99
  }),
  new Product({
    imagePath: 'http://cdn.idigitaltimes.com/sites/idigitaltimes.com/files/2016/06/13/battlefield-1-hands.jpg',
    title: 'BattleField 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 59.99
  }),
  new Product({
    imagePath: 'https://d1r7xvmnymv7kg.cloudfront.net/sites_products/darksouls3/assets/img/DARKSOUL_facebook_mini.jpg',
    title: 'Dark Souls 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 59.99
  }),
  new Product({
    imagePath: 'https://farm6.staticflickr.com/5624/23815901722_4d1edf4ed1_b.jpg',
    title: 'Uncharted 4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 59.99
  }),
  new Product({
    imagePath: 'http://cdn.idigitaltimes.com/sites/idigitaltimes.com/files/2016/06/13/battlefield-1-hands.jpg',
    title: 'BattleField 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 59.99
  }),
  new Product({
    imagePath: 'https://d1r7xvmnymv7kg.cloudfront.net/sites_products/darksouls3/assets/img/DARKSOUL_facebook_mini.jpg',
    title: 'Dark Souls 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 59.99
  }),
  new Product({
    imagePath: 'https://farm6.staticflickr.com/5624/23815901722_4d1edf4ed1_b.jpg',
    title: 'Uncharted 4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 59.99
  })
];

var done = 0;
for (var i = 0; i < products.length; i++) {

  products[i].save(function(err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });

}

function exit() {
  mongoose.disconnect();
}
