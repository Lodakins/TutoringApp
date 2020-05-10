const Categories = require("../models/category");
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
        if(verifyToken(req,res)){
             Categories.find({categoryName: /^[a-zA-Z]+$/}).exec().then(cat=>{
                 if(cat){
                     return res.send({status:true, categories:cat})
                 }
             }).catch(err=>{ return res.send({status:false, message: "Something went wrong"}) });
        }
}