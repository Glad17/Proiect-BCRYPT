import express from "express"
const router = express.Router();
import { logout, signup, userMe, verifyUser, login, resetPassword, forgotPassword, resendVerificationCode } from "../controllers/login.controller.js";
import { checkIfUserLogged } from "../middlewares/checkUserLogged.js";

router.post("/signup", signup);
router.post("/verify", verifyUser);
router.post("/login", login);
router.get("/thisUser", checkIfUserLogged, userMe);
router.post("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);
router.put("/resendVerificationCode", resendVerificationCode);


export const authRouter = router;