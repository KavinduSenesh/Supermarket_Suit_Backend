import {Router} from "express";
import {refreshToken, signInCustomer, signUpCustomer} from "../controllers/authController";

const router = Router();

router.post("/signup", signUpCustomer);
router.post("/signin", signInCustomer);
router.post("/refresh-token", refreshToken);

export default router;
