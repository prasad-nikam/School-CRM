// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import seedDatabase from "./db/seedDB.js";

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";

dotenv.config({
    path: "./env",
});

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("App error: ", error);
            throw error;
        });
        app.listen(PORT || 8080, HOST, () => {
            seedDatabase();
            console.log(`server is running on http://${HOST}:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!!", err);
    });
