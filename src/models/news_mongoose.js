const mongoose = require("mongoose");

//db tables 

const newsSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    }
});

module.exports = mongoose.model("news_mongoose", newsSchema);