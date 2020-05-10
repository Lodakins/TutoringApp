const mongoose = require('mongoose');
const schema = mongoose.Schema;


const tutorSchema = new schema({
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
    isAdmin:{
        type: Boolean,
        default: false
    },
    subjects:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Subjects"
        }
    ],
    lessons: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Lessons"
        }
    ],
    category: [],
    active:{
        type:Boolean,
        required:true,
        default:true
    }
}, {timestamps:true});

module.exports = mongoose.model("Tutors",tutorSchema)
