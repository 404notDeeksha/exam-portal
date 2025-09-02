import express from "express";
const router = express.Router();

import userRouter from "./User.routes.js";
import { protect } from "../middleware/authMiddleware.js";

router.use("/auth", userRouter);

export default router;
