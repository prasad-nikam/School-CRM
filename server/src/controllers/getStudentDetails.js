import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import Student from "../modules/students.js";
const getStudentDetails = asyncHandler(async (req, res) => {
    let decoded = jwt.decode(
        req?.cookies?.token,
        process.env.ACCESS_TOKEN_SECRET
    );

    let student = await Student.findOne({ _id: decoded.id }).populate({
        path: "classname",
        populate: {
            path: "teacher", // Populate the teacher field inside classname (Course)
            model: "Teacher", // Specify the model name (if not automatically inferred)
        },
    });

    let data = {
        name: student?.name,
        email: student?.email,
        phone: student?.phone,
        gender: student?.gender,
        dob: student?.dob,
        classname: student?.classname,
        teacher: student?.teacher?.name,
    };

    res.status(200).json(data);
});

export default getStudentDetails;
