import Teacher from "../modules/teachers.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllTeachers = asyncHandler(async (req, res) => {
    const teacher = await Teacher.find().populate("assignedClass");
    res.status(200).json(teacher);
});
// Get Teacher Profile
export const getTeacherProfile = asyncHandler(async (req, res) => {
    if (req.user.role !== "teacher") {
        return res.status(403).json({ message: "Access denied" });
    }

    const teacher = await Teacher.findById(req.user.id).populate(
        "assignedClass"
    );
    res.status(200).json(teacher);
});

// Update Teacher Profile
export const updateTeacherProfile = asyncHandler(async (req, res) => {
    if (req.user.role !== "teacher") {
        return res.status(403).json({ message: "Access denied" });
    }

    const teacher = await Teacher.findById(req.user.id);
    if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
    }

    const { name, email, phone, gender, dob, salary } = req.body;
    teacher.name = name || teacher.name;
    teacher.email = email || teacher.email;
    teacher.phone = phone || teacher.phone;
    teacher.gender = gender || teacher.gender;
    teacher.dob = dob || teacher.dob;
    teacher.salary = salary || teacher.salary;

    await teacher.save();
    res.status(200).json(teacher);
});
