const Tutor = require('../models/tutor');
const Categories = require("../models/category");
const Subject = require("../models/subject");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { signToken, verifyToken} = require("../middleware/authJWT");
const { authenticateAdmin, authenticateUser } = require("../middleware/authUser");




exports.registerTutor=(req,res,next)=>{
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
 
    if(!email || !password || !gender || !lastName || !firstName){
     return res.send({status:false,message:"One or More required fields Empty"});
 
     }
      Tutor.findOne({email}).then((user)=>{
             if(user){
                 res.status(423).send({status:false,message:"User already existed"}); 
                 return;     
             }else{
                 bcrypt.hash(password, 12).then(password => {
                               let user = new Tutor({firstName,lastName,password,gender,email,phoneNumber});
                               user.save().then((result) =>{ 
                                return res.status(200).send({ status: true, message: "Registration successfully" })
                            }).catch(err => { return res.send({status:false,message:"Registration unsuccessfull"})});
                        }).catch(err=>{
                            return res.send({status:false,message:"Something wrong password unsuccessfull"});
                     })
             }
 
          
 })

}


exports.loginTutor=(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;


    if(!email || !password){
        return res.send({status:false,message:"email / passsword needed"});
    }

    Tutor.findOne({email: email.toLowerCase()}).then(user=>{
        if(!user){
            return res.send({status:false,message:"User does not exist"});
        }else if(user.active === false){
            return res.send({status:true,message:"Your access have been revoked"});
        }else{
            bcrypt.compare(password,user.password).then(result=>{
               
                if(!result){
                    return res.send({status:false,message:"Wrong Password"});
                }else{
                    const token = signToken({email:email,id:user._id});
                    return res.status(200).send({status:true, userId: user._id,email:user.email,token});
                }
            })
        }
    }).catch(err=>{
        return res.send({status:false,message:err});
    })
}


exports.searchTutors=(req,res,next)=>{
    let name = req.query.firstName.toLowerCase();
    let userId = req.body.userId;

      
            if(!name){
                 return res.send({status:false,message:"query parameter firstName missing"});
            }
             Tutor.find({firstName:name}).sort({lastName:"asc"}).exec().then(result=>{
                    if(result.length === 0){
                         return res.send({status:false,message:"Tutors not found"});
                     }
                     res.send({status:true,tutors:result});
    
                }).catch(err=>{
                     return res.send({status:false,message:"Something went wrong"});
             })
    }


exports.registerSubject=(req,res,next)=>{
    let categoryId = req.params.categoryId;
    let subjectId= req.params.subjectId;
    let userId = req.body.userId;

    if(!userId || !categoryId || !subjectId){
        return res.send({status:false,message:"One or more parameter missing"});
    }
            Categories.findOne({_id:categoryId}).select("-_id subjects").populate({path:"subjects"}).exec().then(result=>{
                     let response = result.subjects;
                     let subject = response.some((item)=>{
                         return item._id.toString() === subjectId;
                     })

                     if(subject){
                         Subject.findOne({_id:subjectId}).select("tutors").populate({path:"tutors"}).exec().then(result=>{
                            
                             let response = result.tutors;
                             let status = response.some((item)=> item._id.toString() === userId);
                             if(status){
                                return res.send({status:false,message:"Already registerd for the subject"});
                             }else{
                                Subject.findByIdAndUpdate(subjectId,{
                                      $push: {
                                              tutors: userId
                                           }
                                  }, { new: true, useFindAndModify: false }).then(result=>{

                                    Tutor.findByIdAndUpdate(userId,{
                                        $push: {
                                         subjects: subjectId
                                      }
                                     },
                                    { new: true, useFindAndModify: false }).then(result=>{
                                         res.send({status:true,message:"You have successfully register"});
                                     }).catch(err=>{
                                         console.log("Tutor Error: "+err);
                                         return res.send({status:false,message:err});
                                    })
            
                                  }).catch(err=>{
                                         return res.send({status:false,message:err});
                                  })
                                        
                             }

                         }).catch(err=>{
                             console.log("Error: "+err);
                         })
                    
                     }else{
                         return res.send({status:false,message:"Subject Not found"});
                     }

                    //  ;
                     
    }).catch(err=>{
        console.log("Error: "+err);
        return res.send({status:false,message:"Invalid Category Id"})
    })

};

exports.viewAllSubjects=(req,res,next)=>{
    let userId = req.body.userId;

    Tutor.findOne({_id:userId}).select("-_id subjects").populate("subjects").exec().then(result=>{
        if(result){
            return res.send({status:true,subjects:result.subjects});
         }

    }).catch(err=>{
        return res.send({status:false,message:err});
    })
}

exports.viewAllTutors=(req,res,next)=>{
    let subjectId = req.params.subjectId;
    let categoryId= req.params.categoryId;
    console.log("subjectId: "+subjectId);
    console.log("categoryId: "+categoryId);

    if(!subjectId || !categoryId){
        return res.send({status:false,message:"One of parameter missing"});
    }else{
        Categories.findOne({_id:categoryId}).select("subjects").exec().then(result=>{
                let response = result.subjects;
                console.log("Subjects: "+response);
                if(response.length === 0){
                    return res.send({status:false,message:"Category does not have subjects"});
                }else{
                    let status = response.some(item=>{
                        return item.toString()== subjectId;
                    });
                        console.log("Status: "+status);
                    if(status){
                            Subject.findOne({_id:subjectId}).select("tutors").populate("tutors").select("-_id").exec().then(result=>{
                                    let response= result.tutors;
                                    if(response.length === 0){
                                        return res.send({status:false,message:"Subject does not have tutors"});
                                    }else{
                                        return res.send({status:true,tutors: response});
                                    }
                            }).catch(err=>{
                                return res.send({status:false,message:err});
                            })
                    }else{
                        return res.send({status:false,message:"Subject not registerd in category"});
                    }
                }

        }).catch(err=>{
            return res.send({status:false,message:"Invalid Category Id"});
        })
    }



}

exports.showAllTutors=(req,res,next)=>{

    Tutor.find({}).then(tutors=>{
            if(tutors){
                return res.send({status:true,tutors});
            }

    }).catch(err=>{
        return res.send({status:false,message:err});
    })
}

exports.searchTutorById=(req,res,next)=>{
    let tutorId = req.params.tutorId;
    if(!tutorId){
        return res.send({status:false,message:"tutorId needed"});
    }else{
        Tutor.findOne({_id:tutorId}).then(tutor=>{
            if(tutor === null){
                return res.send({status:false,message:"Tutor does not exist"});
            }else{
                return res.send({status:true,tutor});
            }
        })
    }
}

exports.deactivateTutor=(req,res,next)=>{
    let tutorId= req.params.tutorId;

    if(!tutorId){
        return res.send({status:false,message:"Tutor id missing"});
    }else{
        Tutor.findByIdAndUpdate(tutorId,{
            $set:{
                active:false
            }
        },{new:true,useFindAndModify:false}).then(result=>{
            return res.send({status:true,message:"Tutor deactivated successfully"});
        }).catch(err=>{
            return res.send({status:false,message:"Invalid Tutor Id"});
        })

    }



};