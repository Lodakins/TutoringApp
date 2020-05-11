const User = require("../models/user");
const Tutor = require('../models/tutor');


const ROLES=['student','tutor'];


exports.authenticateUserAdmin =  (req,res,next)=>{
    let userId = req.body.userId;
    if(!userId){
        return res.send({status:false,message:"userId parameter missing"});
    }

    User.findOne({_id:userId}).then(result=>{
        if(result=== null){
            Tutor.findOne({_id:userId}).then(result=>{
                if(result == null){
                    return res.send({status:false,message:"No access right"});
                }else if(result.isAdmin==false){
                    return res.send({status:false,message:"No access right"});
                }else{
                    next();
                }
            })
        }else{
            next();
        }
    })
}


exports.authenticateTutor=  (req,res,next)=>{
    let userId = req.body.userId;
    if(!userId){
        return res.send({status:false,message:"userId parmater needed"})
    }else{
        Tutor.findOne({_id:userId}).then(result=>{
            if(result === null){
                return res.json({status:false,message:"No access right"});
            }else if( result.isAdmin === true){
                return res.json({status:false,message:"No access right"});
            }
            else{
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