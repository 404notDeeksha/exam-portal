import { createAsyncThunk } from "@reduxjs/toolkit";
import examService from "./examService";

export const getExamQuestions = createAsyncThunk(
  "exam/getQuestions",
  async (_, thunkAPI) => {
    try {
      return await examService.fetchQuestionsAPI();

      //   Can sanitize the data to exclude correct ans for extra safety
      // const data = await examService.fetchQuestions();

      // 🔒 Remove correctAnswer if present
      //   const sanitized = data.map((q) => ({
      //     _id: q._id,
      //     text: q.text,
      //     options: q.options,
      //   }));
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch questions"
      );
    }
  }
);

export const submitExam = createAsyncThunk(
  "exam/submit",
  async ({ userId, answers }, thunkAPI) => {
    try {
      return await examService.submitExamAPI({ userId, answers });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to submit exam"
      );
    }
  }
);
