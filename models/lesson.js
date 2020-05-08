const mongoose = require("mongoose");

const Schema =  mongoose.Schema;

const Lessons = new Schema({
        lessonName: {
            type:String,
            lowercase:true,
            trim:true,
            required:true
        },
        lessonDescription: {
            type:String,
            required:true
        },
        subject:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Subject"
        },
        tutors:[
            {
              type:mongoose.Schema.Types.ObjectId,
              ref:"User" 
            }
        ]
});

module.exports = mongoose.model("Lesson",Lessons);