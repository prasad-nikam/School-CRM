import express from "express";
import authUser from "../middlewares/auth.js";
import signup from "../controllers/signup.js";
import login from "../controllers/login.js";
import logout from "../controllers/logout.js";
import getClassList from "../controllers/getClassList.js";
import getLoginDetails from "../controllers/getLoginDetails.js";
import getTeacherDetails from "../controllers/getTeacherDetails.js";
import getStudentDetails from "../controllers/getStudentDetails.js";

const router = express.Router();

//=============================: Basic appliction routs :=====================================//

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getclasslist", getClassList);
router.get("/getLoginDetails", authUser, getLoginDetails);
router.get("/teacherDetails", authUser, getTeacherDetails);
router.get("/studentDetails", authUser, getStudentDetails);

router.get("/", authUser, (req, res) => {
    res.send("hello School");
});

// =========================: CRUD Operations on All Modules :=================================//
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} from "../controllers/Course.controllers.js";
import {
    getStudentProfile,
    updateStudentProfile,
} from "../controllers/Student.controllers.js";
import {
    getTeacherProfile,
    updateTeacherProfile,
    getAllTeachers,
} from "../controllers/Teacher.controllers.js";
import { authenticate, authorize } from "../middlewares/auth.js";
import enrollInClass from "../controllers/enrollInClass.js";

// Course Routes
router
    .route("/courses")
    .get(authenticate, getAllCourses)
    .post(authenticate, authorize("admin"), createCourse);

router
    .route("/courses/:id")
    .get(authenticate, getCourseById)
    .put(authenticate, authorize("admin"), updateCourse)
    .delete(authUser, deleteCourse);

// Student Routes
router
    .route("/students/me")
    .get(authenticate, authorize("student"), getStudentProfile)
    .put(authenticate, authorize("student"), updateStudentProfile);

router.route("/enroll").post(authenticate, enrollInClass);
// Teacher Routes
router
    .route("/teachers/me")
    .get(authenticate, authorize("teacher"), getTeacherProfile)
    .put(authenticate, authorize("teacher"), updateTeacherProfile);

router.route("/allteachers").get(getAllTeachers);
export default router;
