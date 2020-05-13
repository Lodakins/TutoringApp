const router = require("express").Router();
const {signUP, login,register,index} =require('../controllers/auth');
const { createCategories,showAllCategories,deleteCategory,updateCategory} =require('../controllers/category');
const { deactivateTutor,registerTutor,loginTutor,searchTutors,registerSubject,viewAllSubjects,viewAllTutors,showAllTutors,searchTutorById} =require('../controllers/tutor');
const { bookLesson,viewAllLessons,viewLessonById,updateLesson,deleteLesson} =require('../controllers/lesson');
const { createSubjectByCategory,showSubjectByCategory,getSubjectById,searchSubject,updatedSubject,deleteSubject,deletedSuj,updateSubject} =require('../controllers/subject');
const { signToken, verifyToken} = require("../middleware/authJWT");
const { authenticateTutor, authenticateUserAdmin,authenticateAdmin,authenticateUser } = require("../middleware/authUser");


router.get("/",index);
router.post("/signup",register);
router.post("/tutor/signup",registerTutor);
router.post("/login",login);
router.post("/tutor/login",loginTutor);
router.get("/tutors",[verifyToken,authenticateAdmin,showAllTutors]);
router.get("/tutor/:tutorId",[verifyToken,authenticateAdmin,searchTutorById])
router.get("/tutor",[verifyToken,authenticateUserAdmin,searchTutors]);
router.post("/tutors/:categoryId/:subjectId",[verifyToken,authenticateUser,viewAllTutors]);
router.post("/tutor/subjects",[verifyToken,authenticateTutor,viewAllSubjects]);
router.post("/tutor/subject/register/:categoryId/:subjectId",[verifyToken,authenticateTutor,registerSubject]);
router.put("/tutor/subject/:subjectId",[verifyToken,authenticateTutor,updatedSubject]);
router.delete("/tutor/subject/:subjectId",[verifyToken,authenticateTutor,deleteSubject]);
router.get("/tutor/deactivate/:tutorId",[verifyToken,authenticateAdmin,deactivateTutor])
router.post("/lesson/book",bookLesson);
router.post("/category/create",createCategories);
router.delete("/category/:categoryId",[verifyToken,authenticateAdmin,deleteCategory])
router.get("/categories",[verifyToken,showAllCategories]);
router.get("/category/:category/subjects",[verifyToken,showSubjectByCategory]);
router.post("/subject/create",[verifyToken,authenticateAdmin,createSubjectByCategory]);
router.get("/category/:categoryId/subject/:subjectId",getSubjectById);
router.put("/category/:category",[verifyToken,authenticateAdmin,updateCategory]);
router.get("/subject",[verifyToken,searchSubject]);
router.put("/subject/:subjectId",[verifyToken,authenticateAdmin,updateSubject])
router.delete("/subject/:subjectId",[verifyToken,authenticateAdmin,deletedSuj])
router.post("/lesson",[verifyToken,authenticateUserAdmin,bookLesson]);
router.get("/lessons",[verifyToken,authenticateAdmin,viewAllLessons]);
router.get("/lesson/:lessonId",[verifyToken,authenticateAdmin,viewLessonById]);
router.put("/lesson/:lessonId",[verifyToken,authenticateAdmin,updateLesson]);
router.delete("/lesson/:lessonId",[verifyToken,authenticateAdmin,deleteLesson]);

module.exports= router;