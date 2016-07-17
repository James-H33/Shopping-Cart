const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const session       = require('express-session');
const passport      = require('passport');
const flash         = require('connect-flash');
const validator     = require('express-validator');



// Require Routes
const IndexRoute = require('./routes/index');
const UserRoute = require('./routes/user');

const app = express();

mongoose.connect('mongodb://localhost/shopping_cart');
require('./config/passport'); // runs the passport.js configuration

// Ports
const port = process.env.PORT || 3000;
const portIP = process.env.IP;


// view engine setup
app.set('view engine', 'ejs');

// ORDER DOES MATTER
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: 'practicalchicken', 
    resave: false, 
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated(); // This will be either true or false
    next();
});

app.use('/', IndexRoute);
app.use('/user', UserRoute);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.listen(port, portIP, () => console.log('Server has started..'));
