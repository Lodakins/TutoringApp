const Categories = require("../models/category");
const Subject = require("../models/subject");
const { signToken, verifyToken} = require("../middleware/authJWT")
const { authenticateRole, authenticateUser } = require("../middleware/authUser");


exports.createSubjectByCategory=(req,res,next)=>{
    let category = req.query.category;
    let subjectName = req.body.subjectName;
    let subjectDescription = req.body.subjectDescription;


    if( !category || !subjectName || !subjectDescription){
        return res.send({status:false, message:"One or more fields missing"});
    }

    console.log(category);
    console.log(subjectName);
    console.log(subjectDescription);

    Categories.findOne({categoryName:category}).exec().then(cat=>{
        console.log("here ooo");
        if(cat){
            let categoryName = cat.categoryName;
            let catId = cat._id;
            console.log(catId);
            let subject = new Subject({subjectName,subjectDescription,category:categoryName});
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
    let category = req.params.category.toLowerCase();

    if(verifyToken(req,res)){
        if(!category){
            return res.send({status:false, message:"Category parameter missing"});
        }
        Categories.find({categoryName: category}).populate({path:"subjects"}).select("-_id subjects").exec().then(result=>{
                if(result.length === 0){
                    return res.send({status:false, message:"Invalid Category Selected"})
                }
                   return  res.send({status:true,result});

        }).catch(err=>{
            console.log(err);
            return res.send({status:false,message:"Invalid Category Parameter"});
        });
    }
}

exports.getSubjectById=(req,res,next)=>{
        let category = req.params.category;
        let subjectid = req.params.subjectId;
    if(verifyToken(req,res)){
        if(!category || !subjectid){
            return res.send({status:true,message:"One or more missing ids"})
        }

        Categories.findOne({categoryName: category}).select("-_id subjects").populate({path:"subjects"}).populate({path:"category"}).exec().then(result=>{
            if(result.length === 0){
                return res.send({status:false, message:"Invalid Category Selected"})
            }
            let response = result.subjects;
                console.log(response);
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

}

exports.searchSubject=(req,res,next)=>{
    let name =req.query.name;

    if(verifyToken(req,res)){
    if(!name){
        return res.send({status:false,message:"Missing query paramters"});
    }

    Subject.find({subjectName:name}).sort({subjectName:"asc"}).exec().then(result=>{
        if(result.length === 0){
            return res.send({status:false, message:"Subject does not exist"})
        }
        res.send({status:true,result})
    }).catch(err=>{
       return  res.send({status:false,message:"Something went wrong"});
    })

    }
}