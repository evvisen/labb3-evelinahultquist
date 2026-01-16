const SavingsGoal = require("../models/savingsGoals");

// Hämta alla mål
async function getAllGoals() {
  return await SavingsGoal.find();
}

// Skapa ett nytt mål
async function createGoal(data) {
  const newGoal = new SavingsGoal(data);
  return await newGoal.save();
}

// Uppdatera ett mål
async function updateGoal(id, data) {
  return await SavingsGoal.findByIdAndUpdate(id, data, { new: true });
}

// Radera ett mål
async function deleteGoal(id) {
  return await SavingsGoal.findByIdAndDelete(id);
}

module.exports = {
  getAllGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
