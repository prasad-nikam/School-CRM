import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/routes.js";

const app = express();
const allowedOrigins = [
    "http://localhost:5173", // For local development
    "http://13.201.223.5:5173", // Public IP address of React app
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error("CORS policy: Origin not allowed"), false);
            }
        },
        methods: "GET, POST, PUT, DELETE", // Allowed HTTP methods
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/api", router);

export { app };
