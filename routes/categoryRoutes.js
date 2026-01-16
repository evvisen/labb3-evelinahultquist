const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

//hitta vägen till funktionen getAllCategories

router.get("/", categoryController.getAllCategories);

router.post("/", categoryController.createCategory);

router.get("/stats/count", categoryController.getCategoryStats);

router.get("/:id", categoryController.getCategoryById);

router.delete("/:id", categoryController.deleteCategory);

router.put("/:id", categoryController.updateCategory);

module.exports = router;
