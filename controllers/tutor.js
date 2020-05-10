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
    })
}


exports.searchTutors=(req,res,next)=>{
    let name = req.query.firstName.toLowerCase();
    let userId = req.body.userId;

        if(!userId){
            return res.send({status:false,message:"userId parameter missing"});
        }
    if(verifyToken(req,res)){
       if(authenticateUser(req,res,userId) || authenticateAdmin(req,res,userId)){
            if(!name){
                 return res.send({status:false,message:"query parameter firstName missing"});
                 }
             Tutor.find({firstName:name}).sort({lastName:"asc"}).exec().then(result=>{
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
    
  }

}

exports.registerSubject=(req,res,next)=>{
    let categoryId = req.params.categoryId;
    let subjectId= req.params.subjectId;
    let userId = req.body.userId;

    if(!userId || !categoryId || !subjectId){
        return res.send({status:false,message:"One or more parameter missing"});
    }

    if(verifyToken(req,res)){
            if(!authenticateAdmin(req,res,userId)){
                
                Categories.findOne({_id: categoryId}).select("-_id subjects").populate({path:"subjects"}).exec().then(result=>{
                    if(result.length === 0){
                        return res.send({status:false, message:"Invalid Category Selected"})
                    }
                    let response = result.subjects;
                        let subject=null;
                    for(let item of response){
                        let id = item._id.toString();
                        if(id == subjectId){
                            subject = item;
                           
                        }
                    }

                    if(subject !== null){
                        Tutor.findByIdAndUpdate(userId,{
                            $push: {
                              subjects: subject
                            }
                          },
                          { new: true, useFindAndModify: false }).then(result=>{
                                Subject.findByIdAndUpdate(subjectId,{
                                    $push: {
                                        tutors: subject
                                      }
                                })
                                return res.send({status:true,message:"registerd successfully"});
                          });
                    }else{
                    return  res.send({status:false,message:" Subject could not be found"});
                    }
        
            }).catch(err=>{
                console.log(err);
                return res.send({status:false,message:"Invalid Category Parameter"});
            })

        }  

   }

};