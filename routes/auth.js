const router = require("express").Router();
const {signUP, login,register,index} =require('../controllers/auth');
const { createCategories,showAllCategories} =require('../controllers/category');
const { registerTutor,loginTutor,searchTutors,registerSubject,viewAllSubjects} =require('../controllers/tutor');
const { bookLesson} =require('../controllers/lesson');
const { createSubjectByCategory,showSubjectByCategory,getSubjectById,searchSubject,updatedSubject,deleteSubject} =require('../controllers/subject');
const { signToken, verifyToken} = require("../middleware/authJWT");
const { authenticateTutor, authenticateUser } = require("../middleware/authUser");


router.get("/",index);
router.post("/signup",register);
router.post("/tutor/signup",registerTutor);
router.post("/login",login);
router.post("/tutor/login",loginTutor);
router.post("/tutor/subjects",[verifyToken,authenticateTutor,viewAllSubjects]);
router.post("/tutor/subject/register/:categoryId/:subjectId",[verifyToken,authenticateTutor,registerSubject]);
router.put("/tutor/subject/:subjectId",[verifyToken,authenticateTutor,updatedSubject]);
router.delete("/tutor/subject/:subjectId",[verifyToken,authenticateTutor,deleteSubject]);
router.post("/lesson/book",bookLesson);
router.get("/tutor",searchTutors);
router.post("/category/create",createCategories);
router.get("/categories",showAllCategories);
router.get("/category/subject/:category",showSubjectByCategory);
router.post("/subject/create",createSubjectByCategory);
router.get("/category/subject/:category/:subjectId",getSubjectById);
router.get("/subject",searchSubject);

module.exports= router;