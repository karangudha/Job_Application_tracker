import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { User } from "../models/user.model.js";


const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();
        user.refreshToken = refreshToken;
        await user.save({ validationBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens")
    }
}
//register user
const registerUser = asyncHandler(async (req, res) => {
    /*
    register user algo
    take input from request check in model
    validate input
    check if user is already registeres
    hash the password
    generrate access token and refresh token send to frontend
    save data in database
    check is user is registered or not ?
    */

    const { name, email, password } = req.body;

    if ([name, email, password].some((field) =>
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existUser = await User.findOne(email);

    if (existUser) {
        throw new ApiError(400, "User already exists");
    }

    const user = await User.create({
        email,
        password,
        name,
    });

    const createdUser = await User.findById(user._id).select("-password -refreshtoken");
    if (!createdUser) {
        throw new ApiError(500, "User not created");
    }

    return res.status(200).json(
        new ApiResponse(201, createdUser, "User created successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    /* 
        get login details like email and password from req
        validate them not empty
        check if user exist 
        check if password is correct and match with user Saved password
        generate access token and refresh token
        send them to frontend in the from of cookies
    */

    const { email, password } = req.body;
    if ([email, password].some((field) =>
        field?.trim() === ""
    )) {
        throw new ApiError(400, "All fields are required");
    }
    const user = await User.findOne(email);
    if (!user) {
        throw new ApiError(400, "User not found");
    }
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
        throw new ApiError(400, "Invalid credentials");
    }
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

    if (!accessToken || !refreshToken) {
        throw new ApiError(500, "Token not generated");
    }

    const loggedInUser = await User.findById(user._id);

    const options = {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    refreshToken,
                    accessToken
                },
                "User logged in successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    /* 
    take user details from req.url
    if user is loggined then only we can log it out
    for that user have refresh token
    clear refreshtoken and accesstoke and send to frontend means clear cookies
    */

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true,
        }
    )

    const options = {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: true,
    }

    res.clearcookie("accessToken", options);
    res.clearCookie("refreshToken", options);

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "user logged out successfully")
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    /* 
        take refresh token from request
        validate it not empty
        decode token with the help of secret key
        check if user exist
        check if token is not expired
        generate new access and refresh token and send it to frontend in the form of cookies
    */
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(401, "No refresh token provided")
    }

    const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    )

    const user = await User.findById(decodedToken._id);
    if (!user) {
        throw new ApiError(401, "Invalid refresh token")
    }

    if (incomingRefreshToken !== user.refreshToken) {
        throw new ApiError(401, "Refresh token has expired")
    }
    const { accessToken, newRefreshToken } = await generateAccessTokenAndRefreshToken(user._id);

    try {
        await User.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    refreshToken: newRefreshToken
                }
            },
            {
                new: true,
            }
        )
    } catch (error) {
        throw new ApiError(500, "Refresh token is not updated")
    }
    const options = {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken: newRefreshToken
                },
                "Access token refreshed successfully"
            )
        )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(200, req.user, "current user is fetched successfully")
        )
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    /**
     get details new password 
     
     create new password and hash them 
     update in db
     return nothing
     */

    const { newPassword, confirmPassword } = req.body;
    if (!newPassword || !confirmPassword) {
        throw new ApiError(400, "new password is required")
    }
    if (newPassword !== confirmPassword) {
        throw new ApiError(400, "new password and confirm password should be same")
    }
    if (newPassword.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters long");
    }

    const user = await User.findById(req.user._id);
    user.password = newPassword;

    await user.save({ validationBeforeSave: false });

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "password changed successfully")
        )
})

const updateDetails = asyncHandler(async (req, res) => {
    const { name, lastName, email, location } = req.body;

    if (!name || !lastName || !email || !location) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                name,
                lastName,
                email,
                location,
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "User details updated successfully")
        )
})

const getAllUsers = asyncHandler(async (req, res) => {
    // const { userId } = req.params;

    // const users = await User.aggregate([
    //     {
    //         $match: {
    //             _id: new mongoose.Types.ObjectId(userId)
    //         }
    //     },
    //     {
    //         $project: {
    //             _id: 1,
    //             name: 1,
    //             lastName: 1,
    //         }
    //     }
    // ])

    // if (!users?.length) {
    //     throw new ApiError(404, "User not found")
    // }

    // return res
    //     .status(200)
    //     .json(
    //         new ApiResponse(200, users[0], "All users fetched successfully")
    //     )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    changeCurrentPassword,
    updateDetails,
    getAllUsers
};