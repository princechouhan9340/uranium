const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
const userSchema = new mongoose.Schema({
    firstName: String,
    lastname: String,
    mobile: {
        type: String,
        unique: true,
        required: true,

    },
    gender: {
        type: String,
        enum: ["Male","female","LGBTQ","other"]
    },
    emailId : String,
    age: Number,
},{timestamps: true});
module.exports = mongoose.model('User', userSchema)