import jwt from "jsonwebtoken";
import Course from "../modules/courses.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Teacher from "../modules/teachers.js";
const getTeacherDetails = asyncHandler(async (req, res) => {
    let decoded = jwt.decode(
        req?.cookies?.token,
        process.env.ACCESS_TOKEN_SECRET
    );
    let teacher = await Teacher.findOne({ _id: decoded.id });
    let classdetails = await Course.find({ teacher: teacher.id }).populate(
        "students"
    );
    let data = {
        name: teacher?.name,
        email: teacher?.email,
        phone: teacher?.phone,
        gender: teacher?.gender,
        salary: teacher?.salary,
        classdetails: classdetails,
    };

    res.json(data);
});

export default getTeacherDetails;
