const express = require("express");
const router = express.Router();
const savingsGoalController = require("../controllers/savingsGoalController");

router.get("/", savingsGoalController.getGoals);
router.post("/", savingsGoalController.addGoal);
router.put("/:id", savingsGoalController.editGoal);
router.delete("/:id", savingsGoalController.removeGoal);

module.exports = router;
