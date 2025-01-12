import Course from "../modules/courses.js";
export default async (req, res) => {
    const classes = await Course.find({}).populate("teacher");
    res.status(201).json(classes);
};
