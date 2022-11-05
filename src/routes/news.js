const express = require('express')
const newsRouter = express.Router()

const axios = require('axios')
require('dotenv').config()
const mongoose = require('mongoose')
const { db } = require('mongodb')
const { DB } = require('../models/news_mongoose')

//login from github code
const generateUniqueId = require('generate-unique-id');

var User = require('../models/user');
newsRouter.get('/', function (req, res, next) {
	return res.render('index.ejs');
});

//Default-Route (First Page of localhost)
newsRouter.post('/', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;


	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {
			User.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){

						if (data) {
							console.log(data);
                            c  = generateUniqueId({
                                length: 10,
                                useLetters: false,
                                useNumbers: true
                              });
						}else{
							c=1;
						}

                        //Inserts into MongoDB Database
						var newPerson = new User({
							unique_id:c,
							email:personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});
                      

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are registered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});

newsRouter.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

//Login-Route (Second Page of localhost)
newsRouter.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
				req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});

newsRouter.get('/news-page', function (req, res, next) {
	console.log("profile");
	User.findOne({unique_id:req.session.userId},async function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			//console.log("found");
			//return res.render('data.ejs', {"name":data.username,"email":data.email});
            try {
                var url = `http://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.TOKEN}`;
               const newsAPI = await axios.get(url)
               // const newsAPI = await axios.get(`https://raddy.dev/wp-json/wp/v2/posts/`)
               res.render('news', {articles: newsAPI.data.articles, name:data.username, email:data.email})
           } catch (err) {
               if (err.response) {
                   res.render('news', { articles: null })
                   console.log(err.response.data)
                   console.log(err.response.status)
                   console.log(err.response.headers)
               } else if (err.request) {
                   res.render('news', { articles: null })
                   console.log(err.request)
               } else {
                   res.render('news', { articles: null })
                   console.error('Error', err.message)
               }
           }
		}
	});
});

newsRouter.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

newsRouter.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

newsRouter.post('/forgetpass', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});

//

/*
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
            console.log(err.request)
        } else {
            res.render('news', { articles: null })
            console.error('Error', err.message)
        }
    }
})
*/


 






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
        } else if (err.request) {
            res.render('newsSingle', { article: null })
            console.log(err.request)
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
        } else if (err.request) {
            res.render('newsSearch', { articles: null })
            console.log(err.request)
        } else {
            res.render('newsSearch', { articles: null })
            console.error('Error', err.message)
        }
    }


})

module.exports = newsRouter 

