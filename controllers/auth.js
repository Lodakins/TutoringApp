const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.register=(req,res,next)=>{
   const email = req.body.email;
   const firstName = req.body.firstName;
   const lastName = req.body.lastName;
   const password = req.body.password;
   const gender = req.body.gender;
   const phoneNumber = req.body.phoneNumber;
   const role = req.body.role;
   const category = req.body.category;

   



}