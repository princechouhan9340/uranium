const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
   
    authorName: {
        type:String,
        required:true
    },
    age:Number,
    address:String,
    ratting:Number
}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema)

