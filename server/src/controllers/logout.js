import { asyncHandler } from "../utils/asyncHandler.js";

const logout = asyncHandler(async (req, res) => {
    res.status(200)
        .cookie("token", "", { httpOnly: true })
        .send("You are logged out");
});

export default logout;
