const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const mongoose = require("mongoose");

const news_mongoose = require('./src/models/news_mongoose')

const app = express();
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

//connect to db
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true, useUnifiedTopology:true}, ()=> console.log("Connected to DB"))

// Listen on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`))

//token import

