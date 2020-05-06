const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String
    },
    role:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
}, {timestamps:true});

module.exports = mongoose.model("User",userSchema)
