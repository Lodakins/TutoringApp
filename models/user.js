const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    firstname:{

    },
    lastname:{

    },
    category:{
        
    }
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}, {timestamps:true});
