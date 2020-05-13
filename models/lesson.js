const mongoose = require("mongoose");

const Schema =  mongoose.Schema;

const Lessons = new Schema({
        lessonName: {
            type:String,
            lowercase:true,
            trim:true,
            required:true
        },
        lessonDate:{
            type:Date,
            default: Date.now,
            required:true
        },
        lessonTime:{
            type: String,
            required:true
        },
        subject:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Subjects"
        },
        tutor:
            {
              type:mongoose.Schema.Types.ObjectId,
              ref:"Tutors" 
            }
        ,
        student:
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        
});

module.exports = mongoose.model("Lesson",Lessons);