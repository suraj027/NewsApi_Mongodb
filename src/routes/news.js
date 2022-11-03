const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')
require('dotenv').config()
const mongoose = require('mongoose')
const { db } = require('mongodb')
const { DB } = require('../models/news_mongoose')


newsRouter.get('/', async (req, res) => {
    try {
         var url = `http://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.TOKEN}`;
        const newsAPI = await axios.get(url)
        // const newsAPI = await axios.get(`https://raddy.dev/wp-json/wp/v2/posts/`)
        res.render('news', { articles: newsAPI.data.articles })
    } catch (err) {
        if (err.response) {
            res.render('news', { articles: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.request) {
            res.render('news', { articles: null })
            console.log(err.requiest)
        } else {
            res.render('news', { articles: null })
            console.error('Error', err.message)
        }
    }
})

//register

newsRouter.get("/register", function (req, res) {
    res.render("register");
});

newsRouter.post('/register', function(req,res){
    var name = req.body.name;
    var email =req.body.email;
    var password = req.body.password;
    
    var data = {
        "name": name,
        "email":email,
        "password":password
    }
db.products('details').insertOne(data,function(err){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
          
    return res.redirect('news');
})


//api fetch
newsRouter.get('/entertainment', async(req, res) => {
    try {
        
        let entertainment_url = `http://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=${process.env.TOKEN}`;
    
        const entertainment = await axios.get(entertainment_url);
        console.log(entertainment.data)
        // res.render('news', { politics : politics })
        res.render('news', { articles: entertainment.data.articles })
    } catch (error) {
        res.render('news', { articles: null })
        console.log(error)
    }
})

newsRouter.get('/health', async(req, res) => {
    try {
        
        let health_url = `http://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=${process.env.TOKEN}`;
    
        const health = await axios.get(health_url);
        console.log(health.data)
        // res.render('news', { politics : politics })
        res.render('news', { articles: health.data.articles })
    } catch (error) {
        res.render('news', { articles: null })
        console.log(error)
    }
})

newsRouter.get('/sports', async(req, res) => {
    try {
        
        let sports_url = `http://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${process.env.TOKEN}`;
    
        const sports = await axios.get(sports_url);
        console.log(sports.data)
        // res.render('news', { politics : politics })
        res.render('news', { articles: sports.data.articles })
    } catch (error) {
        res.render('news', { articles: null })
        console.log(error)
    }
})

newsRouter.get('/technology', async(req, res) => {
    try {
        
        let technology_url = `http://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=${process.env.TOKEN}`;
    
        const technology = await axios.get(technology_url);
        console.log(technology.data)
        // res.render('news', { politics : politics })
        res.render('news', { articles: technology.data.articles })
    } catch (error) {
        res.render('news', { articles: null })
        console.log(error)
    }
})

newsRouter.get('/business', async(req, res) => {
    try {
        
        let business_url = `http://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${process.env.TOKEN}`;
    
        const business = await axios.get(business_url);
        console.log(business.data)
        // res.render('news', { politics : politics })
        res.render('news', { articles: business.data.articles })
    } catch (error) {
        res.render('news', { articles: null })
        console.log(error)
    }
})


newsRouter.get('/general', async(req, res) => {
    try {
        
        let general_url = `http://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=${process.env.TOKEN}`;
    
        const general = await axios.get(general_url);
        console.log(general.data)
        // res.render('news', { politics : politics })
        res.render('news', { articles: general.data.articles })
    } catch (error) {
        res.render('news', { articles: null })
        console.log(error)
    }
})

newsRouter.get('/:id', async (req, res) => {
    //let articleID = req.params.id
    let category = req.params.category;
    try {
       
        var url = 'http://newsapi.org/v2/top-headlines?country=in&category=' 
        + category + 
        '&apiKey=885fb49181994fb0b02a5c02563195d9';
        const newsAPI = await axios.get(url)

         //const newsAPI = await axios.get(`https://raddy.dev/wp-json/wp/v2/posts/${articleID}`)
        res.render('newsSingle', { article: newsAPI.data })
    } catch (err) {
        if (err.response) {
            res.render('newsSingle', { article: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('newsSingle', { article: null })
            console.log(err.requiest)
        } else {
            res.render('newsSingle', { article: null })
            console.error('Error', err.message)
        }
    }
})


newsRouter.post('', async (req, res) => {
    //let search = req.body.search
    let search = req.body.search
    try {

        var url = `http://newsapi.org/v2/everything?q=${search}&apiKey=885fb49181994fb0b02a5c02563195d9`

        //const newsAPI = await axios.get(`https://raddy.dev/wp-json/wp/v2/posts?search=${search}`)
        const newsAPI = await axios.get(url)
        res.render('newsSearch', { articles: newsAPI.data })
    } catch (err) {
        if (err.response) {
            res.render('newsSearch', { articles: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('newsSearch', { articles: null })
            console.log(err.requiest)
        } else {
            res.render('newsSearch', { articles: null })
            console.error('Error', err.message)
        }
    }


})



module.exports = newsRouter 
