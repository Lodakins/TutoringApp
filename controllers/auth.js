const User = require('../models/user');
const Categories = require("../models/category");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signToken, verifyToken} = require("../middleware/authJWT")
const { authenticateRole, authenticateUser } = require("../middleware/authUser");



exports.index=(req,res,next)=>{
    res.send({status:true,message:"Welcome to the tutoring app"});
}
exports.register=(req,res,next)=>{
   const email = req.body.email;
   const firstName = req.body.firstName;
   const lastName = req.body.lastName;
   const password = req.body.password;
   const gender = req.body.gender;
   const phoneNumber = req.body.phoneNumber;

   if(!email || !password || !gender || !lastName || !firstName){
    return res.send({status:false,message:"One or More required fields Empty"});

    }
         User.findOne({email}).then((user)=>{
            if(user){
                res.status(423).send({status:false,message:"User already existed"}); 
                return;     
            }else{
                bcrypt.hash(password, 12).then(password => {
                              let user = new User({firstName,lastName,password,gender,email,phoneNumber});
                              user.save().then((result) =>{ 
                               return res.status(200).send({ status: true, message: "Registration successfully" })
                           }).catch(err => { return res.send({status:false,message:"Registration unsuccessfull"})});
                }).catch(err=> { return res.send({status:false,message:"Something went wrong"})})   
            }

         });
}


exports.login = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    if(!email || !password){
        return res.send({status:false,message:"email / passsword needed"});
    }

    User.findOne({email: email.toLowerCase()}).then(user=>{
        if(!user){
            return res.send({status:false,message:"User does not exist"});
        }else{
           
            bcrypt.compare(password,user.password,).then(result=>{
                
                if(!result){
                    return res.send({status:false,message:"Wrong Password"});
                }else{
                    const token = signToken({email:email,id:user._id});
                    return res.status(200).send({status:true, userId: user._id,email:user.email,token});
                }
            })
        }
    })
}


exports.searchTutors=(req,res,next)=>{
    let name = req.query.firstName;
    let userId = req.body.userId;

        if(!userId){
            return res.send({status:false,message:"userId parameter missing"});
        }
    if(verifyToken(req,res)){
       authenticateUser(res,req,userId).then(user=>{
        if(user.role ==="admin" || user ==="student"){
            if(!name){
                 return res.send({status:false,message:"query parameter firstName missing"});
                 }
             User.find({firstName:name}).where({ role: 'tutor' }).sort({lastName:"asc"}).exec().then(result=>{
                    if(result.length ===0){
                         return res.send({status:false,message:"Tutors not found"});
                     }
                     res.send({status:true,result});
    
                }).catch(err=>{
                  console.log(err)
                     return res.send({status:false,message:"Something went wrong"});
             })
         }else{
                 return res.send({status:false,message:"No access right"});
        }
    })
    
  }

}