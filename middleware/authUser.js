const User = require("../models/user");
const Tutor = require('../models/tutor');


const ROLES=['student','tutor'];


exports.authenticateUser =  (req,res,userId)=>{
    let user = User.findOne({_id:userId});
        if(user){
            return user;
        }else{
            return false;
        }
           // if(user){
    //             return true;
    //         }else{
    //            
    //         }
    // }).catch(err=>{
    //     return res.send({status:false,message:"Something went wrong with validating user"});
    // })

}
exports.authenticateTutor=  (req,res,next)=>{
    let userId = req.body.userId;
    if(!userId){
        return res.send({status:false,message:"userId parmater needed"})
    }else{
        Tutor.findOne({_id:userId}).then(result=>{
            if(result === null){
                return res.json({status:false,message:"No access right"});
            }else{
               next();
            }
        }).catch(err=>{
            console.log("Error: "+ err);
        })  
    }
         
}

exports.authenticateCategory=(req,res,next)=>{
       let categoryId= req.body.categoryId;



}


exports.authenticateRole=(res,req,userId,access)=>{
    User.findOne({_id:userId}).then(user=>{
        if(user){
            if(user.role === access){
                return true;   
            }else{
                return res.send({status:false,message:"No access right"});
            }
        }
    }).catch(err=>{
        res.send({status:false,message:"Something went wrong, user authentication failed"});
    })
}

exports.validateRoles=(role)=>{
    for(let user of ROLES){
        if(user== role){
            return true;
        }
    }
    return false;
}