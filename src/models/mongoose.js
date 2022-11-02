const mongoose = require("mongoose");

//db tables 

const newsSchema = mongoose.Schema({
    firstname : {
        type : String,
        require : true
    },
    mail : {
        type : String,
        require : true
    }
});

module.exports = mongoose.model("Posts", newsSchema);