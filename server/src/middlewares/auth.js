import jwt from "jsonwebtoken";
import Student from "../modules/students.js";
import Teacher from "../modules/teachers.js";
export default function authUser(req, res, next) {
    try {
        if (!req?.cookies?.token) {
            return res.status(403).send("You are not logged in");
        }
        jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (error) {
        next(error);
    }
}

export const authenticate = async (req, res, next) => {
    try {
        const token =
            req?.cookies?.token || req?.headers?.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;

        if (decoded.role === "student") {
            req.user.details = await Student.findById(decoded.id);
        } else if (decoded.role === "teacher") {
            req.user.details = await Teacher.findById(decoded.id);
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(403).json({ message: "Access denied" });
    }
};

export const authorize =
    (...roles) =>
    (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
