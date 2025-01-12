import Teacher from "../modules/teachers.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Course from "../modules/courses.js";
export default async (req, res) => {
    const {
        name,
        gender,
        dob,
        email,
        phone,
        salary,
        assignedClass,
        classname,
        password,
    } = req.body;

    if (await Teacher.findOne({ email: email })) {
        res.status(401).send("Email is already registerd");
    } else {
        const hashedpass = await bcrypt.hash(password, 10);
        const user = new Teacher({
            name: name,
            phone: phone,
            email: email,
            password: hashedpass,
            gender: gender,
            // dob: new Date(dob),
            salary: salary,
            assignedClass: assignedClass,
            classname: classname || "",
        });
        const teacher = await user.save();
        await Course.findByIdAndUpdate(assignedClass, {
            teacher: teacher.id,
        });
        const token = jwt.sign(
            { id: teacher._id, email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        teacher.token = token;
        teacher.password = undefined;

        res.status(201).cookie("token", token, options).json({
            message: "User signed up Successfully",
            teacher,
            token: token,
        });
    }
};
