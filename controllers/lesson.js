const Tutor = require('../models/tutor');
const Categories = require("../models/category");
const Subjects = require("../models/subject");
const Lesson = require("../models/lesson");
const User = require("../models/user");

exports.bookLesson=(req,res,next)=>{
    let name = req.body.name;
    let date = req.body.date;
    let time = req.body.time;
    let subjectId = req.body.subjectId;
    let tutorId = req.body.tutorId;
    let studentId = req.body.studentId;
    console.log("subject Id: "+subjectId);


    if(!name || !date || !time || !subjectId || !tutorId || !studentId){
        return res.send({status:false,message:"One or more parameter missing"});
    }else{
        Subjects.findOne({_id:subjectId}).then(result=>{
            console.log("result: "+result);
            let response= result.tutors;
            console.log("response: "+response);
            if(response.length == 0){
                return res.send({status:false,message:"No Tutor exist for this subject"});
            }else{
                let status = response.some(item=>{
                    return item.toString()== tutorId;
                });
                console.log("Status: "+status);
                if(status){
                  let lesson = new Lesson;
                  lesson.lessonName= name;
                  lesson.lessonDate=date;
                  lesson.lessonTime= time;
                  lesson.subject=subjectId;
                  lesson.tutor=tutorId;
                  lesson.student=studentId;
                  lesson.save().then(result=>{

                      const id = result._id;

                      Tutor.findByIdAndUpdate(tutorId,{
                          $push:{
                              lessons: id
                          }
                      },{new:true,useFindAndModify:false}).then(result=>{
                          User.findByIdAndUpdate(studentId,{
                              $push:{
                                  lessons:id
                              }
                          },{new:true,useFindAndModify:false}).then(result=>{
                              return res.send({status:true,message:"You have successfully book for lessons"});

                          }).catch(err=>{
                              return res.send({status:false,err});
                          })

                      }).catch(err=>{
                          return res.send({status:false,err});
                      })
                  
                  }).catch(err=>{
                      return res.send({status:false,err});
                  })
                     

                }else{
                    return res.send({status:false,message:"Tutor not assigned to this subject"})
                }
            }

        }).catch(err=>{
            return res.send({status:false,message:"Invalid subject Id",err});
        })



    }

};

exports.viewAllLessons=(req,res,next)=>{

        Lesson.find({}).then(lessons=>{
                if(lessons){
                    return res.send({status:true,lessons});
                }
        }).catch(err=>{ 
            return res.send({status:false,message:err});
        })


};

exports.viewLessonById=(req,res,next)=>{
    let lessonId = req.params.lessonId;

    if(!lessonId){
        return res.send({status:false,message:"Lesson id missing"});
    }else{
        Lesson.findOne({_id:lessonId}).then(lesson=>{
            if(lesson == null){
                return res.send({status:false,message:"Lesson not found"});
            }else{
                return res.send({status:true,lesson});
            }
        }).catch(err=>{
            return res.send({status:false,message:"Invalid lesson id"});
        })

    }


}

exports.updateLesson=(req,res,next)=>{

    let lessonId = req.params.lessonId;
    let date= req.body.date;
    let time = req.body.time;
    let tutorId=req.body.tutorId;

    if(!lessonId){
        return res.send({status:false,message:"Lesson id missing"});
    }else{
        let obj={};
        if(date || time || tutor){
            date ? obj.lessonDate=date:"";
            time ? obj.lessonTime=time:"";
            tutorId ? obj.tutor= tutorId:"";
            console.log(JSON.stringify(obj));
            Lesson.findOne({_id:lessonId}).then(lesson=>{
                console.log("Lesson: "+lesson);
                if(lesson == null){
                    return res.send({status:false,message:"lesson does not exits"});
                }else{
                    let oldTutorId = lesson.tutor;
                    console.log("Old Tutor: "+oldTutorId.toString());
                     Lesson.findByIdAndUpdate(lessonId.toString(),{
                         $set:obj
                     },{new:true,useFindAndModify:false}).then(result=>{
                         console.log("Result after update: "+result);
                         console.log("tutorId: "+tutorId.length);
                         if(tutorId.length > 0 ){
                             console.log("Here in tutorId: ");
                             Tutor.findByIdAndUpdate(oldTutorId,{
                                 $pull:{
                                     lessons:lessonId
                                 }
                            },{new:true,useFindAndModify:false}).then(result=>{
                                 Tutor.findByIdAndUpdate(tutorId,{
                                     $push:{
                                         lessons:lessonId
                                     }
                                 },{new:true,useFindAndModify:false}).then(result=>{
                                     if(result){
                                         return res.send({status:true, message:"Lesson updated successfully"});
                                     }
                                 }).catch(err=>{
                                     return res.send({status:false,err});
                                 })
            
                            }).catch(err=>{
                                 return res.send({status:false,err});
                             })
                         }else{
                             console.log("NO tutor id:");
                             return res.send({status:true,message:"lesson updated successfully"});
                         }
                        
                        
                     }).catch(err=>{
                         return res.send({status:false,message:err});
                     });
                }
            }).catch(err=>{
                return res.send({status:false,err});
            })
        }else{
            return res.send({status:false,message:"One or more parameter needeed"});
        }
        

    }

}

exports.deleteLesson=(req,res,next)=>{
    let lessonId = req.params.lessonId;

    if(!lessonId){
        return res.send({status:false,message:"lesson Id missing"});
    }else{
        Lesson.findOne({_id:lessonId}).then(lesson=>{
            if(lesson== null){
                return res.send({status:false,message:"Lesson not found"});
            }else{
                let tutorId=lesson.tutor;
                let studentId= lesson.student;
                console.log("TutorId: "+tutorId);
                console.log("StudentId: "+studentId);
                Lesson.deleteOne({_id:lessonId}).then(result=>{

                    Tutor.findByIdAndUpdate(tutorId.toString(),{
                        $pull:{
                            lessons:lessonId
                        }
                    },{new:true,useFindAndModify:false}).then(result=>{
                        User.findByIdAndUpdate(studentId.toString(),{
                            $pull:{
                                lessons:lessonId
                            }
                        },{new:true,useFindAndModify:false}).then(result=>{
                            return res.send({status:true,message:"lesson deleted successfully"});

                        }).catch(err=>{
                            return res.send({status:false,err});
                        })
    
                    }).catch(err=>{
                            return res.send({status:false,err});
                    })

                }).catch(err=>{
                    return res.send({status:false,err});
                })
               
            }
           


        }).catch(err=>{
            return res.send({status:false,err});
        })
    }



};