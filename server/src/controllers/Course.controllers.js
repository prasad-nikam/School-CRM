import Course from "../modules/courses.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a Course
export const createCourse = asyncHandler(async (req, res) => {
    const { classname, year, studentfee, maxStudent, teacher } = req.body;

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }

    const course = await Course.create({
        classname,
        year,
        studentfee,
        maxStudent,
        teacher,
    });
    res.status(201).json(course);
});

// Get All Courses
export const getAllCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find().populate("teacher students");
    // setting password null
    courses.map((crs) => {
        if (!(crs?.teacher?.password == null)) crs.teacher.password = null;
        crs.students.map((std) => {
            std.password = null;
        });
    });
    res.status(200).json(courses);
});

// Get Single Course
export const getCourseById = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id).populate(
        "teacher students"
    );
    if (!(course?.teacher?.password == null)) course.teacher.password = null;
    course.students.map((std) => {
        std.password = null;
    });
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
});

// Update a Course
export const updateCourse = asyncHandler(async (req, res) => {
    const { classname, year, studentfee, maxStudent, teacher } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }

    course.classname = classname || course.classname;
    course.year = year || course.year;
    course.studentfee = studentfee || course.studentfee;
    course.maxStudent = maxStudent || course.maxStudent;
    course.teacher = teacher || course.teacher;

    await course.save();
    res.status(200).json(course);
});

// Delete a Course
export const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    console.log(course);

    await course.deleteOne();
    res.status(200).json({ message: "Course deleted successfully" });
});
