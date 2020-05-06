var express = require('express');
var mongoose = require("mongoose");
var authRoutes = require('./routes/auth');
require('dotenv').config();

const apiKey = process.env.API_KEY;

var app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(authRoutes);


mongoose.connect(`mongodb+srv://lodakins99:${apiKey}@cluster0-8mzir.mongodb.net/test?retryWrites=true&w=majority`,
                { useNewUrlParser: true, useUnifiedTopology: true }).then(result => {console.log("Database connected");app.listen(3000);}).catch(err => console.log(err));