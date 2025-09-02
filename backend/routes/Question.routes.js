import express from "express";
const examRouter = express.Router();

import { getQuestions, submitExam } from "../controllers/Question.controller.js";

examRouter.route("/questions").get(getQuestions);
examRouter.route("/submit").post(submitExam);

export default examRouter;
