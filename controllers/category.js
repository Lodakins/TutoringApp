const Categories = require("../models/category");
const Subject = require("../models/subject");
const Tutor = require("../models/tutor");
const { signToken, verifyToken} = require("../middleware/authJWT")
const { authenticateRole, authenticateUser } = require("../middleware/authUser");

exports.createCategories=(req,res,next)=>{
    let name=req.body.categoryName;
    let description= req.body.categoryDescription;

    if( !name || !description){
        return res.send({status:false,message:"Fields cannot be empty"});
    }

    Categories.findOne({categoryName:name}).then(cat=>{
            if(cat){
                 res.send({status:false,message:"Category already Exist"});
                 return;
            }
            let category = new Categories({categoryName: name,categoryDescription: description});
                category.save().then(result=>{
                    return res.send({status:true,message:"Categories created successfull"});
                }).catch(err=>{
                    return res.send({status:false,message:"Categories went wrong"})
                })
    }).catch(err=>{return res.send({status:false,message:"Something went wrong"})})
    
};


exports.showAllCategories=(req,res,next)=>{
             Categories.find({}).exec().then(categories=>{
                 if(categories){
                     return res.send({status:true, categories});
                 }
             }).catch(err=>{ return res.send({status:false, message: "Something went wrong"}) });
}

exports.deleteCategory=(req,res,next)=>{

    let categoryId = req.params.categoryId;

    Categories.findOne({_id:categoryId}).select("-_id subjects").exec().then(result=>{
        if(result.subjects.length===0){
            Categories.deleteOne({_id:categoryId}).then(result=>{
                if(result){
                    return res.send({status:true,message:"Category deleted successfully",result});
                }

            }).catch(err=>{
                return res.send({status:false,message:err});
            })
        }else{
            let subject = result.subjects;
         
            subject.forEach(async element => {
             await Subject.findOne({_id:element}).select("tutors").then(result=>{
                    let response = result.tutors;
                    if(response.length === 0){
                        Subject.deleteOne({_id:element}).exec().then(result=>{
                           
                        }).catch(err=>{
                            return res.send({status:false,message:err});
                        });
                    }else{
                      
                    response.forEach(async item=>{
                        await Tutor.findByIdAndUpdate(item.toString(),{
                            $pull:{ subjects: element}
                        },{ new: true, useFindAndModify: false });
                    });
        
                    Subject.deleteOne({_id:element}).then(result=>{
                        if(result){
                          
                        }
                      }).catch(err=>{
                        return res.send({status:false,message:err});
                     }); 
                }

            }).catch(err=>{
                return res.send({status:false,message:err});
            })
            
         });
         Categories.deleteOne({_id:categoryId}).then(result=>{
            if(result){
                return res.send({status:true,message:"Category deleted successfully"});
            }

        }).catch(err=>{
            return res.send({status:false,message:err});
        })
      }

    }).catch(err=>{
        return res.send({status:false,message:"Invalid category Id",err});
    });


};

exports.updateCategory=(req,res,next)=>{
    console.log("Req Paramters: "+req.params);
    let categoryId = req.params.category;
    console.log("CategoryId: "+categoryId);
    let name = req.body.name;
    let description = req.body.description;
    let obj={};

    if(!categoryId){
        return res.send({status:false,message:"Categoryid cannot be empty"});
    }


    if( name || description){
        name  ? obj.categoryName=name : "";
        description ? obj.categoryDescription=description :"";
        console.log("obj: "+obj);

        Categories.findByIdAndUpdate(categoryId,{$set:obj},{new:true,useFindAndModify:false}).then(result=>{
                return res.send({status:true,message:"Categories successfully updated"});
        }).catch(err=>{
            return res.send({status:false,message:"Invalid Category Id"});
        })


    }else{
        return res.send({status:false,message:"Both parameter cannot be empty"})
    }



}