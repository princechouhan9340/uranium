// --------ASSIGNMENT 13YH APRIL ---------
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    Bookname:{
        type:String,
        required: true
    },
        author_id:Number,
        price:Number,
        ratings:Number,

}, { timestamps: true });


module.exports= mongoose.model("newBook",bookSchema)