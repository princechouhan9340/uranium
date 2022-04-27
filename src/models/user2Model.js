const mongoose = require('mongoose');

const user2Schema = new mongoose.Schema( {
    firstName: {type:String,required:true},
    lastName: String,
    mobile: {
        type: String,
        required: true
    },
    emailId: String,
    password: String,
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    age: Number,
    isDeleted: {
        type: Boolean,
        default: false
    } ,
    post:[String] 
}, { timestamps: true });

module.exports = mongoose.model('User2', user2Schema)