const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.signToken=(payload)=>{
  const token = jwt.sign(payload,process.env.TOKEN,{expiresIn:"48h"});
  return token;
}

exports.verifyToken = (req,res,next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({ status:false,message: "Requires Api key[x-access-token] access" });
    }
    
   jwt.verify(token, process.env.TOKEN, (err, decoded) => {
      if(err) {
        return res.status(401).send({ status:false, message:"Invalid api key/token, login to get a new one!" });
      }else{
        req.token = decoded;
        next();
      }
     
    });
  };