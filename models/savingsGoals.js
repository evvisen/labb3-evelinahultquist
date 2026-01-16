const mongoose = require("mongoose");

const savingsGoalSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  deadline: { type: Date, required: true },
  goalAmount: { type: Number, required: true },
  currentSaving: { type: Number, default: 0 },
  category: { type: String },
  milestones: [{ type: String }],
  priority: { type: Boolean, default: false },
  status: { type: String },
  riskLevel: { type: String, default: "low" },
});

module.exports = mongoose.model("SavingsGoal", savingsGoalSchema);
