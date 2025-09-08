import React, { useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectAnswer, goToNext, goToPrev } from "../features/exam/examSlice";
import { getExamQuestions, submitExam } from "../features/exam/examThunks";

import { useNavigate } from "react-router-dom";
import { routes } from "../constants/routes";

export const Exam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { questions, currentIndex, answers, timer, loading, error } =
    useSelector((state) => state.exam);

  const userId = useSelector((state) => state.auth.user.id);

  console.log("Questions", questions);
  console.log("current index", currentIndex);
  console.log("answers", answers);
  console.log("Loading", loading);

  const currentQuestion = questions[currentIndex];

  // Fetch questions on mount
  useEffect(() => {
    if (questions.length === 0) {
      dispatch(getExamQuestions());
    }
  }, [dispatch, questions.length]);


  const handleOptionChange = (event) => {
    dispatch(
      selectAnswer({
        questionId: currentQuestion._id,
        selectedAnswer: event.target.value,
      })
    );
  };

  const handleNext = () => dispatch(goToNext());
  const handlePrevious = () => dispatch(goToPrev());

  const handleSubmit = async () => {
    const answersArray = Object.entries(answers).map(
      ([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer,
      })
    );

    const result = await dispatch(
      submitExam({ userId, answers: answersArray })
    ).unwrap();

    navigate(routes.result, { state: result, replace: true }); // send score & total to result page
  };

  // const formatTime = (seconds) => {
  //   const mins = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${mins.toString().padStart(2, "0")}:${secs
  //     .toString()
  //     .padStart(2, "0")}`;
  // };

  if (loading) return <CircularProgress />;
  if (!currentQuestion) return null;

  console.log("Error -->", error);
  return (
    <Box
      minHeight="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f9f9f9"
      p={2}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 700,
        }}
      >
        {/* Header row with timer */}
        <Box
          display="flex"
          justifyContent="flex-end"
          mb={2} // margin bottom for spacing
        >
          {/* <Typography variant="h6" color="error">
            Time Left: {formatTime(timer)}
          </Typography> */}
        </Box>

        {/* Question Text */}
        <Typography variant="h6" gutterBottom>
          Q{currentIndex + 1}. {currentQuestion.text}
        </Typography>

        {/* Options */}
        <RadioGroup
          value={answers[currentQuestion._id] || ""}
          onChange={handleOptionChange}
        >
          {currentQuestion.options.map((opt, index) => (
            <FormControlLabel
              key={index}
              value={opt}
              control={<Radio />}
              label={opt}
            />
          ))}
        </RadioGroup>

        {/* Navigation */}
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            disabled={currentIndex === 0}
            onClick={handlePrevious}
          >
            Previous
          </Button>

          {currentIndex === questions.length - 1 ? (
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Submit Exam
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
