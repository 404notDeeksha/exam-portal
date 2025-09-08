import express from "express";
const questionRouter = express.Router();

import {
  getQuestions,
  submitExam,
} from "../controllers/Question.controller.js";

questionRouter.route("/questions").get(getQuestions);
questionRouter.route("/submit").post(submitExam);

export default questionRouter;
