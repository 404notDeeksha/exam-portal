import mongoose from "mongoose";

const examSettingsSchema = new mongoose.Schema({
  duration: { type: Number, required: true }, // in minutes
  maxAttempts: { type: Number, default: 1 },
  allowTabSwitch: { type: Boolean, default: true },
  // add tab switch logic at both be & fe
});
const ExamSettings = mongoose.model("ExamSetting", examSettingsSchema);

export default ExamSettings;
