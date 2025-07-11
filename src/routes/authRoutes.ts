import {Router} from "express";
import {signUpUser} from "../controllers/authController";

const router = Router();

router.post("/signup", signUpUser);

export default router;
