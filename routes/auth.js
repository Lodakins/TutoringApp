const router = require("express").Router();
const {signUP, login,register,index,searchTutors} =require('../controllers/auth');
const { createCategories,showAllCategories} =require('../controllers/category');
const { registerTutor,loginTutor} =require('../controllers/tutor');
const { bookLesson} =require('../controllers/lesson');
const { createSubjectByCategory,showSubjectByCategory,getSubjectById,searchSubject} =require('../controllers/subject');


router.get("/",index);
router.post("/signup",register);
router.post("/tutor/signup",registerTutor);
router.post("/login",login);
router.post("/tutor/login",loginTutor);
router.post("/lesson/book",bookLesson);
router.get("/tutor",searchTutors);
router.post("/category/create",createCategories);
router.get("/categories",showAllCategories);
router.get("/subject/:categoryName",showSubjectByCategory);
router.post("/subject/create",createSubjectByCategory);
router.get("/category/:category/subjects/:subjectId",getSubjectById);
router.get("/subject",searchSubject);

module.exports= router;