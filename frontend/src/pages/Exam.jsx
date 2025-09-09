import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { EXAM_DURATION } from "../constants/examTime";

export const Exam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { questions, currentIndex, answers, loading, error } = useSelector(
    (state) => state.exam
  );

  const userId = useSelector((state) => state.auth.user.id);

  const currentQuestion = useMemo(() => {
    return questions[currentIndex];
  }, [questions, currentIndex]);

  // 2. Timer State
  const [remainingTime, setRemainingTime] = useState(EXAM_DURATION);

  // 3. Fetch questions on mount
  useEffect(() => {
    if (questions.length === 0) {
      dispatch(getExamQuestions());
    }
  }, [dispatch, questions.length]);

  // 4. Initialize start time in localStorage
  useEffect(() => {
    let storedStart = Number(localStorage.getItem("examStartTime"));

    if (!storedStart) {
      storedStart = Date.now();
      localStorage.setItem("examStartTime", storedStart);
    }

    const endTime = parseInt(storedStart, 10) + EXAM_DURATION;

    let interval;
    // Interval to update timer
    const updateTimer = () => {
      const now = Date.now();
      const remaining = endTime - now;

      if (remaining <= 0) {
        clearInterval(interval);
        handleSubmit(); // auto-submit
      } else {
        setRemainingTime(remaining);
      }
    };

    updateTimer(); // immediately run once on mount

    interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []); // run once

  // 4. Format time
  const formatTime = (ms) => {
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleOptionChange = useCallback(
    (event) => {
      if (!currentQuestion) return;
      dispatch(
        selectAnswer({
          questionId: currentQuestion._id,
          selectedAnswer: event.target.value,
        })
      );
    },
    [dispatch, currentQuestion]
  );

  const handleNext = useCallback(() => dispatch(goToNext()), [dispatch]);
  const handlePrevious = useCallback(() => dispatch(goToPrev()), [dispatch]);

  const handleSubmit = useCallback(async () => {
    // prevent multiple submits
    if (!localStorage.getItem("examStartTime")) return;

    const answersArray = Object.entries(answers).map(
      ([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer,
      })
    );

    try {
      const result = await dispatch(
        submitExam({
          userId,
          answers: answersArray,
          startedAt: Number(localStorage.getItem("examStartTime")), // send to backend
        })
      ).unwrap();

      // clear storage to block retake
      localStorage.removeItem("examStartTime");

      navigate(routes.result, { state: result, replace: true });
    } catch (err) {
      console.error("Submit failed:", err);
    }
  });

  if (loading) return <CircularProgress />;
  if (!currentQuestion) return null;

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
          <Typography variant="h6" color="error">
            Time Left: {formatTime(remainingTime)}
          </Typography>
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
