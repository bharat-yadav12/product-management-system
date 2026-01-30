import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser,
    updateAccountDetails 
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerSchema,loginSchema } from "../validations/auth.validation.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";


const router = Router()

router.route("/register").post(validateRequest(registerSchema),registerUser)
router.route("/login").post(validateRequest(loginSchema),loginUser)

router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)


export default router