import Student from "../modules/students.js";
import Teacher from "../modules/teachers.js";
import Admin from "../modules/admin.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const login = asyncHandler(async (req, res) => {
    const { email, password, userType } = req.body;

    if (userType == "student") {
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(401).json({ message: "Invalid student email" });
        }

        const isPasswordCorrect = await student.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const accessToken = student.generateAccessToken();

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true, //cookies could not be accesed on browser directly
        };

        res.status(200).cookie("token", accessToken, options).json({
            message: "Login successful",
            accessToken,
        });
    }
    if (userType == "teacher") {
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(401).json({ message: "Invalid Teacher Email" });
        }

        const isPasswordCorrect = await teacher.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res
                .status(401)
                .json({ message: "Invalid teacher password" });
        }

        const accessToken = teacher.generateAccessToken();

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true, //cookies could not be accesed on browser directly
        };

        res.status(200).cookie("token", accessToken, options).json({
            message: "Login successful",
            accessToken,
        });
    } else if (userType == "admin") {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = await admin.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        const token = admin.generateAccessToken();

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true, //cookies could not be accesed on browser directly
        };

        res.status(200)
            .cookie("token", token, options)
            .json({ message: "Login successful", token });
    } else {
        res.status(400).json({ message: "invalid usertype" });
    }
});

export default login;
