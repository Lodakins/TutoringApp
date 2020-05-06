const router = require("express").Router();
const {signUP, login,register} =require('../controllers/auth') ;


router.post("/register",register);