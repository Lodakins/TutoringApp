const express = require('express');
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth');
require('dotenv').config();


const app = express();

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZlZWxhbmNlQGdtYWlsLmNvbSIsImlkIjoiNWViNTFjYmY4OGE4MzAzNGNjOGIwY2I4IiwiaWF0IjoxNTg4OTI4MzQ5LCJleHAiOjE1ODg5MzE5NDl9.s16ivtvSD-SFnvovzi41b_-Qf3mPxQIL2bXUkrLQeAw

const apiKey = process.env.API_KEY;


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(authRoutes);


mongoose.connect(`mongodb+srv://lodakins99:${apiKey}@tutoringapp-6jldb.mongodb.net/test?retryWrites=true&w=majority`,
                 { useNewUrlParser: true, useUnifiedTopology: true }).then(result => {console.log("Database connected");app.listen(2900);}).catch(err => console.log(err));