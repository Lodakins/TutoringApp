const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema({
    firstName:{
        type:String,
        lowercase:true,
        trim:true,
        required:true
    },
    lastName:{
        type:String,
        lowercase:true,
        trim:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        lowercase:true,
        trim:true,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
        trim:true,
        required:true
    },
    phoneNumber:{
        type:String
    },
    lessons: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Lesson"
        }
    ],
    active:{
        type:Boolean,
        required:true,
        default:true
    }
}, {timestamps:true});

module.exports = mongoose.model("User",userSchema)
