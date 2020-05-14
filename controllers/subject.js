const Categories = require("../models/category");
const Subject = require("../models/subject");
const { signToken, verifyToken} = require("../middleware/authJWT")
const { authenticateRole, authenticateUser } = require("../middleware/authUser");
const Tutor = require("../models/tutor");


exports.createSubjectByCategory=(req,res,next)=>{
    let category = req.body.categoryId;
    let subjectName = req.body.subjectName;
    let subjectDescription = req.body.subjectDescription;


    if( !category || !subjectName || !subjectDescription){
        return res.send({status:false, message:"One or more fields missing"});
    }

    Categories.findOne({_id:category}).exec().then(cat=>{
        if(cat){
            let categoryName = cat.categoryName;
            let catId = cat._id;
            let subject = new Subject({subjectName,subjectDescription,category:catId});
                subject.save().then(sub=>{
                    //5eb45c36bfa43640f4ca0074;
                    console.log("Save subject successfully");
                    console.log(sub);
                    Categories.findByIdAndUpdate(
                        catId,
                        {
                          $push: {
                            subjects: sub._id
                          }
                        },
                        { new: true, useFindAndModify: false }
                      ).then(result=>{
                        if(result){
                            res.send({status:true,message:"Subject create successfully",subject:sub});
                        }
                }).catch(err=>{
                  return  res.send({status:false,message:err});
                });
            }).catch(err=>{
                 return   res.send({status:false,message:"Category does not exits",error:err})
            })
        
    }

    }).catch(err=>{
        return res.send({status:false,message:"Invalid Category selected"});
    });

}


exports.showSubjectByCategory=(req,res,next)=>{
    let category = req.params.categoryId.toLowerCase();

        if(!category){
            return res.send({status:false, message:"Category parameter missing"});
        }
        Categories.find({_id: category}).populate({path:"subjects"}).select("-_id subjects").exec().then(result=>{
                if(result.length === 0){
                    return res.send({status:false, message:"Invalid Category Selected"})
                }
                   return  res.send({status:true,subjects:result[0].subjects});

        }).catch(err=>{
            console.log(err);
            return res.send({status:false,message:"Invalid Category Parameter"});
        });
}

exports.getSubjectById=(req,res,next)=>{
        let category = req.params.categoryId;
        let subjectid = req.params.subjectId;

        if(!category || !subjectid){
            return res.send({status:true,message:"One or more missing ids"})
        }

        Categories.findOne({_id: category}).select("-_id subjects").populate({path:"subjects"}).populate({path:"category"}).exec().then(result=>{
            if(result.length === 0){
                return res.send({status:false, message:"Invalid Category Selected"})
            }
            let response = result.subjects;
            for(let item of response){
                let id = item._id.toString();
                if(id == subjectid){
                    return res.send({status:true,subject: item})
                }
            }
               return  res.send({status:false,message:" Subject could not be found"});

    }).catch(err=>{
        console.log(err);
        return res.send({status:false,message:"Invalid Category Parameter"});
    });


}

exports.searchSubject=(req,res,next)=>{
    let name =req.query.name;

    if(!name){
        return res.send({status:false,message:"Missing query paramters"});
    }

    Subject.find({subjectName:name}).sort({subjectName:"asc"}).exec().then(result=>{
        if(result.length === 0){
            return res.send({status:false, message:"Subject does not exist"})
        }
        res.send({status:true,subjects:result})
    }).catch(err=>{
       return  res.send({status:false,message:"Something went wrong"});
    })

}

exports.updatedSubject=(req,res,next)=>{
    let subjectId = req.params.subjectId;
    let name = req.body.subjectName;
    let description = req.body.subjectDescription;
    let userId= req.body.userId;
    let obj={};
    if(!subjectId){
        return res.send({status:false,message:"subjectId is missing"});
    }

    if(name || description){
          name  ? obj.subjectName=name : "";
          categoryId ? obj.category=categoryId :"";
          description ? obj.subjectDescription=description :"";

          Categories.findOne({_id:categoryId}).select("-_id subjects").exec().then(result=>{

            Subject.findOne({_id:subjectId}).select("tutors").populate({path:"tutors"}).exec().then(result=>{
                            
                let response = result.tutors;
                let status = response.some((item)=> item._id.toString() === userId);
                if(status){
                    Subject.findByIdAndUpdate(subjectId,{$set:obj}
                        ,{new:true,useFindAndModify:false}).then(result=>{
                        return res.send({status:true,message:"Subject Update Sucessfully"});
                        }).catch(err=>{
                        return res.send({status:false,message:"Invalid Subject ID"});
                    })
                   
                }else{
                    return res.send({status:false,message:" You did not register for the subject"});
                }
    
            }).catch(err=>{
                return res.send({status:false,message:err});
            })


          }).catch(err=>{
              return res.send({status:false,message:"Invalid Category Id"});
          }) 
       
    }else{
        return res.send({status:false,message:"Both parameters cannot be empty"})
    }

   
}

exports.deleteSubject=(req,res,next)=>{
    let userId = req.body.userId;
    let subjectId = req.params.subjectId;
    if(!subjectId){
        return res.send({status:false,message:"subjectId is missing"});
    }
    Tutor.findByIdAndUpdate({_id:userId},{
        $pull:{
            subjects:subjectId
        }
    },{ new: true, useFindAndModify: false }).then(result=>{
        if(result){
            return res.send({status:true,message:"Registered Subjectd Delete successfully"});
        }
    }).catch(err=>{
        return res.send({status:true,message:err});
    })

}


exports.deletedSuj=(req,res,next)=>{

    let subjectId = req.params.subjectId;
    let categoryId= req.params.categoryId;

    if(!categoryId || !subjectId){
        return res.send({status:false,message:"One or more empty paramters"});
    }

    Categories.findOne({_id:categoryId}).select("-_id subjects").exec().then(result=>{
        let response = result.subjects;
        
        let status = response.some((item)=>{
            return item._id.toString() === subjectId;
        })

        
        if(status){
            let subject=[];
            response.forEach(element => {
                if(element.toString() !== subjectId){
                    subject.push(element);
                }
            });
            
            Categories.findByIdAndUpdate(categoryId,{
                $set: {
                        subjects: subject
                     }
            }, { new: true, useFindAndModify: false }).then(result=>{
                Subject.findOne({_id:subjectId}).select("tutors").then(result=>{
                        let response = result.tutors;
                      
                        if(response.length === 0){
                            Subject.deleteOne({_id:subjectId}).exec().then(result=>{
                                    if(result){
                                        return res.send({status:true,message:"Subject Deleted successfully"});
                                    }
                            }).catch(err=>{
                                return res.send({status:false,message:err});
                            })
                        }else{
                        response.forEach(async item=>{
                            await Tutor.findByIdAndUpdate(item.toString(),{
                                $pull:{ subjects: subjectId}
                            },{ new: true, useFindAndModify: false });
                        });

                        Subject.deleteOne({_id:subjectId}).then(result=>{
                            if(result){
                                return res.send({status:true,message:"Subject Deleted successfully"});
                            }
                          }).catch(err=>{
                            return res.send({status:false,message:err});
                         }); 
                    }

                }).catch(err=>{
                    return res.send({status:false,message:err});
                })


            }).catch(err=>{
                return res.send({status:false,message:err});
            })

        }else{
            return res.send({status:false,message:"Subject is not registered in this category"});
        }
        
}).catch(err=>{
console.log("Error: "+err);
return res.send({status:false,message:"Invalid Category Id"})
})


}

exports.updateSubject=(req,res,next)=>{
    let subjectId = req.params.subjectId;
    let name = req.body.subjectName;
    let description= req.body.subjectDescription;
    let categoryId= req.params.categoryId;
    let userId= req.body.userId;
    let obj={};
    if(!subjectId ){
        return res.send({status:false,message:"subjectId is missing"});
    }
    if( !categoryId){
        return res.send({status:false,message:"categoryId is missing"});
    }

    if(name  || description){
          name  ? obj.subjectName=name : "";
          description ? obj.subjectDescription=description :"";

          Categories.findOne({_id:categoryId}).select("-_id subjects").exec().then(result=>{
            let response = result.subjects;
        
            let status = response.some((item)=>{
                return item._id.toString() === subjectId;
            })
    
            
            if(status){


            Subject.findOne({_id:subjectId}).select("tutors").populate({path:"tutors"}).exec().then(result=>{
                            
                    Subject.findByIdAndUpdate(subjectId,{$set:obj},{new:true,useFindAndModify:false}).then(result=>{
                        return res.send({status:true,message:"Subject Update Sucessfully"});
                        }).catch(err=>{
                        return res.send({status:false,message:"Invalid Subject ID"});
                    })
           
    
            }).catch(err=>{
                return res.send({status:false,message:"Invalid Subject Selected"});
            })
                    
        }else{
           return res.send({status:false,message:"Subject is not in this category"});     
        }

          }).catch(err=>{
              return res.send({status:false,message:"Invalid Category Id"});
          })
          
       
    }else{
        return res.send({status:false,message:"Both parameters cannot be empty"})
    }

   

}