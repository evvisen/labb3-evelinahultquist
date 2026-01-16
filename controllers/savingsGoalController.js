const savingsService = require("../services/savingsGoalService");

//Visa alla mål
exports.getGoals = async (req, res) => {
  try {
    const goals = await savingsService.getAllGoals();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//skapa ett nytt mål
exports.addGoal = async (req, res) => {
  try {
    const newGoal = await savingsService.createGoal(req.body);
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Uppdatera (används även för att sätta prioritet)

exports.editGoal = async (req, res) => {
  try {
    const updated = await savingsService.updateGoal(req.params.id, req.body);
    if (!updated)
      return res.status(404).json({ message: "Målet hittades inte" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Radera ett sparmål
exports.removeGoal = async (req, res) => {
  try {
    const deleted = await savingsService.deleteGoal(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Målet hittades inte" });
    res.json({ message: "Sparmålet raderat!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
