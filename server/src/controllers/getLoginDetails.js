import { asyncHandler } from "../utils/asyncHandler.js";
import Student from "../modules/students.js";
import Teacher from "../modules/teachers.js";
import Admin from "../modules/admin.js";
import jwt from "jsonwebtoken";
const getLoginDetails = asyncHandler(async (req, res) => {
    let user = jwt.decode(req?.cookies?.token, process.env.ACCESS_TOKEN_SECRET);
    if (await Student.findOne({ email: user?.email })) {
        res.status(200).json({
            usertype: "student",
        });
    } else if (await Teacher.findOne({ email: user?.email })) {
        res.status(200).json({
            usertype: "teacher",
        });
    } else if (await Admin.findOne({ email: user?.email })) {
        res.status(200).json({
            usertype: "admin",
        });
    } else {
        res.status(404).json({
            usertype: "invalid",
            message: "invalid token",
            user,
        });
    }
});
export default getLoginDetails;
