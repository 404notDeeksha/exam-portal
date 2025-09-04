// src/features/exam/examSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getExamQuestions, submitExam } from "./examThunks";

const initialState = {
  questions: [],
  currentIndex: 0,
  answers: {}, // { questionId: selectedAnswer }
  timer: 30 * 60,
  loading: false,
  error: null,
  result: null,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    selectAnswer: (state, action) => {
      const { questionId, selectedAnswer } = action.payload;
      state.answers[questionId] = selectedAnswer;
    },
    goToNext: (state) => {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex++;
      }
    },
    goToPrev: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
      }
    },
    tickTimer: (state) => {
      if (state.timer > 0) {
        state.timer--;
      }
    },
    resetExam: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExamQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExamQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;

        // sanitise the data for correctAnswer if it sneaks in
        // state.questions = action.payload.map((q) => ({
        //   _id: q._id,
        //   text: q.text,
        //   options: q.options,
        // }));
      })
      .addCase(getExamQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitExam.fulfilled, (state, action) => {
        state.loading = false;
        state.result = {
          score: action.payload.score,
          total: action.payload.total,
        };
      })
      .addCase(submitExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectAnswer, goToNext, goToPrev, tickTimer, resetExam } =
  examSlice.actions;

export default examSlice.reducer;
