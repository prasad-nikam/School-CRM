import Student from "../modules/students.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get Student Profile
export const getStudentProfile = asyncHandler(async (req, res) => {
    if (req.user.role !== "student") {
        return res.status(403).json({ message: "Access denied" });
    }

    const student = await Student.findById(req.user.id).populate("classname");
    res.status(200).json(student);
});

// Update Student Profile
export const updateStudentProfile = asyncHandler(async (req, res) => {
    if (req.user.role !== "student") {
        return res.status(403).json({ message: "Access denied" });
    }

    const student = await Student.findById(req.user.id);
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, email, phone, gender, dob } = req.body;
    student.name = name || student.name;
    student.email = email || student.email;
    student.phone = phone || student.phone;
    student.gender = gender || student.gender;
    student.dob = dob || student.dob;

    await student.save();
    res.status(200).json(student);
});
