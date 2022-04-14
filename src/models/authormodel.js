// --------ASSIGNMENT 13YH APRIL ---------
const mongoose = require('mongoose')

let authorSchema = new mongoose.Schema({
    
    author_id:Number,
    author_name:{
        type:String,
        required: true
    },
    age:Number,
    address:String

}, { timestamps: true });

module.exports= mongoose.model("newAuthor",authorSchema)