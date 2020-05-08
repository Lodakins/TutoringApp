const mongoose = require("mongoose");

const Schema =  mongoose.Schema;

const Categories = new Schema({
        categoryName: {
            type:String,
            lowercase:true,
            trim:true,
            required:true
        },
        categoryDescription: {
            type:String,
            required:true,
            lowercase:true,
        },
        subjects:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Subjects"
            }
        ]
},{timestamps:true});

module.exports = mongoose.model("Category",Categories);