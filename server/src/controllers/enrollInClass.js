import { asyncHandler } from "../utils/asyncHandler.js";
import Course from "../modules/courses.js";
import Student from "../modules/students.js";
import jwt from "jsonwebtoken";

const enrollInClass = asyncHandler(async (req, res) => {
    const { classid, feespaid } = req.body;

    const decoded = jwt.decode(
        req.cookies.token,
        process.env.ACCESS_TOKEN_SECRET
    );

    const user = await Student.findById(decoded.id);

    if (!user) {
        return res.status(404).json({ message: "Student not found" });
    }

    // Check if classid already exists in the student's classname array
    if (user.classname.includes(classid)) {
        return res
            .status(400)
            .json({ message: "Student is already enrolled in this class" });
    }

    // Convert feespaid to a number before adding
    user.classname.push(classid);
    user.paidfee += Number(feespaid);
    await user.save();

    const course = await Course.findById(classid);

    if (!course) {
        return res.status(404).json({ message: "Class not found" });
    }

    // Check if student ID already exists in the class's students array
    if (course.students.includes(decoded.id)) {
        return res
            .status(400)
            .json({ message: "Student is already added to this class" });
    }

    course.students.push(decoded.id);
    await course.save();

    res.status(200).json({ message: "Assigned to class successfully" });
});

export default enrollInClass;
