import { EXAM_DURATION_MS } from "../config/examConfig.js";
import Question from "../models/Question.model.js";
import Result from "../models/Result.model.js";

// GET /api/exam/questions
export const getQuestions = async (req, res) => {
  try {
    // Fetch 10 random questions
    const questions = await Question.aggregate([
      { $sample: { size: 10 } }, // randomize
      { $project: { text: 1, options: 1 } }, // exclude correctAnswer
    ]);

    if (!questions || questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions available.",
      });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
};

// POST /api/exam/submit
export const submitExam = async (req, res) => {
  try {
    const userId = req.user.id; // comes from token, not body
    const { answers, startedAt } = req.body;
    // Check for valid user & data

    if (!userId || !answers || !Array.isArray(answers) || !startedAt) {
      return res.status(400).json({ message: "Invalid submission data" });
    }

    const startedAtMs = Number(startedAt);

    if (Number.isNaN(startedAtMs)) {
      return res.status(400).json({ message: "Invalid startedAt timestamp" });
    }

    // 1. Reject if already submitted
    const existing = await Result.findOne({ userId });
    if (existing) {
      return res.status(409).json({ message: "Exam already submitted" });
    }

    // 2. Reject if expired
    const now = Date.now();
    if (now > startedAtMs + EXAM_DURATION_MS) {
      return res.status(400).json({ message: "Exam time expired" });
    }

    // 3. Fetch all question IDs included in submission
    const questionIds = answers.map((a) => a.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } });

    // Build evaluated answers
    let score = 0;
    const evaluatedAnswers = answers.map((ans) => {
      const question = questions.find(
        (q) => q._id.toString() === ans.questionId
      );

      const isCorrect =
        question && question.correctAnswer === ans.selectedAnswer;

      if (isCorrect) score++;

      return {
        questionId: ans.questionId,
        selectedAnswer: ans.selectedAnswer,
        isCorrect,
      };
    });

    // 4. Save result
    const newResult = new Result({
      userId,
      answers: evaluatedAnswers,
      score,
      startedAt: startedAtMs,
      submittedAt: now,
    });
    await newResult.save();

    res.status(201).json({
      message: "Exam submitted successfully",
      score,
      total: answers.length,
    });
  } catch (error) {
    console.error("Error submitting exam:", error);
    res.status(500).json({ message: "Failed to submit exam" });
  }
};
