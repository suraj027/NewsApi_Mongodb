const express = require('express')
require('dotenv').config();
//github
var ejs = require('ejs');
var path = require('path');
//github



const dotenv = require("dotenv");
//require("./db/conn")

const news_mongoose = require('./src/models/news_mongoose')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require("mongoose");

//github--
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  }));

//github

dotenv.config({ path: ".env" });
const port = process.env.PORT || 5001

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

// Templating Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

// Routes
const newsRouter = require('./src/routes/news')
app.use('/', newsRouter)
app.use('/article', newsRouter)

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('File Not Found');
//     err.status = 404;
//     next(err);
//   });
  
  // error handler
  // define as the last app.use callback
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });



// Listen on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`))

//token import

