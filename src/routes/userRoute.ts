import express from "express";
import { login, logout, signup } from "../controller/userController";
import { checkAuth } from "../controller/userController";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/check-auth", requireAuth, checkAuth);
router.get("/logout", logout);

export default router;
