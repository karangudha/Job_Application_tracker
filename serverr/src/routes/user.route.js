import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    changeCurrentPassword,
    updateDetails,
    getAllUsers
} from "../controllers/user.controller.js";

const router = Router();

router.use(verifyJWT);
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/refresh-tokes").post(refreshAccessToken)
router.route("/change-password").patch(changeCurrentPassword)
router.route("/update-details").put(updateDetails)

router.route("/current-user").get(getCurrentUser)
//router.route("/getAllUser").get(getAllUsers)
