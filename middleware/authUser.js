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
                    return res.send({status:false,message:"User has no access right"});
                }else if(result.isAdmin==false){
                    return res.send({status:false,message:"User has no access right"});
                }else{
                    next();
                }
            })
        }else{
            next();
        }
    })
}


exports.authenticateUser=(req,res,next)=>{
    let userId= req.body.userId;
    if(!userId){
        return res.send({status:false,message:"userId paramter missing"});
    }else{
        User.findOne({_id:userId}).then(result=>{
            if(result == null){
                return res.send({status:false,message:"User has no access right"});
            }
            next();
        }).catch(err=>{
            return res.send({status:false,message:"Invalid userId"});
        })
    }

}

exports.authenticateTutor=  (req,res,next)=>{
    let userId = req.body.userId;
    if(!userId){
        return res.send({status:false,message:"userId parmater needed"})
    }else{
        Tutor.findOne({_id:userId}).then(result=>{
            if(result === null){
                return res.json({status:false,message:"User has no access right"});
            }else if( result.isAdmin === true || result.active == false){
                return res.json({status:false,message:"User has no access right"});
            }
            else{
               next();
            }
        }).catch(err=>{
            console.log("Error: "+ err);
        })  
    }
         
}

exports.authenticateAdmin=(req,res,next)=>{
    let userId = req.body.userId;
    if(!userId){
        return res.send({status:false,message:"userId parmater needed"})
    }else{
            Tutor.findOne({_id:userId}).then(result=>{
                if(result === null){
                    return res.json({status:false,message:"User has no access right"});
                }else if( result.isAdmin === false){
                    return res.json({status:false,message:"User has no access right"});
                }
                else{
                   next();
                }
            }).catch(err=>{
                return res.send({status:false,message:err});
            })
     } 
}