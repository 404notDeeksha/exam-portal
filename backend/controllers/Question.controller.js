import Question from "../models/Question.model.js";

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
 
};
