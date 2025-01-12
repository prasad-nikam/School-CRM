import Student from "../modules/students.js";
import Course from "../modules/courses.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export default async (req, res) => {
    const { name, gender, dob, email, phone, feesPaid, classname, password } =
        req.body;

    if (await Student.findOne({ email: email })) {
        res.status(401).json({ message: "Email is already registerd" });
    } else {
        const hashedpass = await bcrypt.hash(password, 10);
        const obj = new Student({
            name: name,
            phone: phone,
            email: email,
            password: hashedpass,
            gender: gender,
            dob: new Date(dob),
            paidfee: feesPaid,
            classname: [classname],
        });
        const student = await obj.save();

        await Course.findByIdAndUpdate(classname, {
            $push: { students: student.id },
        });
        const token = jwt.sign(
            { id: student._id, email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        student.token = token;
        student.password = undefined;

        res.status(201).cookie("token", token, options).json({
            message: "User signed up Successfully",
            student,
            token: token,
        });
    }
};
