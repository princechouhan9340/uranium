const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName:{
        type: String,
        required:true
    },

    authorName: String, 
    categorie: String,
    isPublished: Boolean,
    publish_year : {type: Number, default: 2022},
    
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    stock:{
        type: Number,
        default: 0
    },
    page:Number
 
}, { timestamps: true });


module.exports = mongoose.model('Bookcollection', bookSchema) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
