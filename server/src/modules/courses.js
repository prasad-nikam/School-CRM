import mongoose from "mongoose";
const classSchema = mongoose.Schema(
    {
        classname: {
            type: String,
            required: true,
            unique: true,
        },
        year: {
            type: String,
            required: true,
        },
        studentfee: {
            type: Number,
            required: true,
        },
        students: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Student",
        },
        maxStudent: {
            type: Number,
            default: 25,
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
        },
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model("Course", classSchema);

export default Course;
