import express from "express";
const router = express.Router();

import userRouter from "./User.routes";

router.use("/auth", userRouter);

export default router;
