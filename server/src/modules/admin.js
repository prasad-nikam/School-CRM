import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// Hash password before saving
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password
adminSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Generate JWT token
adminSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { id: this._id, email: this.email, role: "admin" },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
