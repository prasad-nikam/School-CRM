import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const studentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
        },
        phone: {
            type: Number,
        },
        gender: {
            type: String,
            required: true,
            enum: ["male", "female"],
        },
        dob: {
            type: Date,
        },
        password: {
            type: String,
            required: true,
        },
        totalfee: {
            type: Number,
        },
        paidfee: {
            type: Number,
            default: 0,
        },
        refreshToken: {
            type: String,
        },
        classname: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
                required: true,
                unique: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
});

studentSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

studentSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            role: "student",
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};
studentSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

const Student = mongoose.model("Student", studentSchema);

export default Student;
