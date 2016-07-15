const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');


// Require Routes
const IndexRoute = require('./routes/index');

const app = express();

mongoose.connect('mongodb://localhost/shopping_cart');

// Ports
const port = process.env.PORT || 3000;
const portIP = process.env.IP;


// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', IndexRoute);

app.listen(port, portIP, () => console.log('Server has started..'));
