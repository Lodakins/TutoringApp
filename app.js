const express = require('express');
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth');
require('dotenv').config();
const bodyParser = require("body-parser");


const app = express();

const apiKey = process.env.API_KEY;

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/v1",authRoutes);


mongoose.connect(`mongodb+srv://lodakins99:${process.env.API_KEY}@tutoringapp-6jldb.mongodb.net/test?retryWrites=true&w=majority`,
                 { useNewUrlParser: true, useUnifiedTopology: true }).then(result => { app.listen(port);  console.log("Database connected")}).catch(err =>{console.log(err); return res.json({status:false,err})});