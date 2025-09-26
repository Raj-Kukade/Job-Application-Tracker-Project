/* === server/models/Job.js === */
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  company: { type: String, required: true },
  link: { type: String, required: true },
  title: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: String, required: true },
  jobEmail: { type: String, default: "" },
  jobPassword: { type: String, default: "" }
});

export default mongoose.model("Job", jobSchema);
