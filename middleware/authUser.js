const User = require("../models/user");


const ROLES=['student','tutor'];


exports.authenticateUser = async (req,res,userId)=>{
    let user =await User.findOne({_id:userId});
        return user.role;
           // if(user){
    //             return true;
    //         }else{
    //             return res.send({status:false,message:"You are not authenticate to view this file"});
    //         }
    // }).catch(err=>{
    //     return res.send({status:false,message:"Something went wrong with validating user"});
    // })

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