import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError, apiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies.token?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new apiError(401, 'No token found');
        }

        const decodedJWT = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedJWT._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(404, "User not found")
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid token")
    }
})