import teacherSignup from "./teacherSignup.js";
import studentSignup from "./studentSignup.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const signup = asyncHandler(async (req, res) => {
    try {
        const { userType } = req.body;

        if (userType == "student") {
            studentSignup(req, res);
        } else if (userType == "teacher") {
            teacherSignup(req, res);
        } else {
            res.status(403).json({
                message: "Invalid usertype",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(501).json({
            message: error,
        });
    }
});

export default signup;
