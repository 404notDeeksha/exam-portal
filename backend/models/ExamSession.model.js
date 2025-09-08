import mongoose from "mongoose";

const examSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one session per user
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam", // assuming you’ll have an Exam collection
      required: true,
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
      required: true, // = startTime + duration (from ExamSettings)
    },
    status: {
      type: String,
      enum: ["active", "submitted", "expired"],
      default: "active",
    },
  },
  { timestamps: true }
);

const ExamSession = mongoose.model("ExamSession", examSessionSchema);

export default ExamSession;
