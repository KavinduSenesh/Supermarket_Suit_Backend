import {Router} from "express";
import {signInCustomer, signUpCustomer} from "../controllers/authController";

const router = Router();

router.post("/signup", signUpCustomer);
router.post("/signin", signInCustomer);

export default router;
