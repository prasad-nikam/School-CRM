import Course from "../modules/courses.js";
import Admin from "../modules/admin.js";

const seedDatabase = async () => {
    try {
        const courses = [
            {
                classname: "physics",
                year: "2025",
                studentfee: 12000,
                maxStudent: 25,
            },
            {
                classname: "chemistry",
                year: "2025",
                studentfee: 11000,
                maxStudent: 25,
            },
            {
                classname: "Mathematics",
                year: "2025",
                studentfee: 16000,
                maxStudent: 25,
            },
            {
                classname: "Biology",
                year: "2025",
                studentfee: 15000,
                maxStudent: 25,
            },
        ];

        for (const record of courses) {
            const exists = await Course.findOne({
                classname: record.classname,
            });
            if (!exists) {
                await Course.create(record);
                console.log(`Inserted: ${record.classname}`);
            } else {
                console.log(`Record already exists: ${record.classname}`);
            }
        }

        const exists = await Admin.findOne({
            email: process.env.ADMIN_EMAIL,
        });
        if (!exists) {
            await Admin.create({
                name: "admin",
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
            });
            console.log(`Admin Created with email: ${process.env.ADMIN_EMAIL}`);
        } else {
            console.log(`Record already exists: ${process.env.ADMIN_EMAIL}`);
        }
        console.log("Seeding completed!");
    } catch (err) {
        console.error("Error seeding database:", err);
    }
};

export default seedDatabase;
