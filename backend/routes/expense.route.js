const express = require("express");
const { getAllExpenses, addNewExpense, updateExpense, deleteExpense } = require("../controllers/expense.controller");
const { auth } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get("/", auth, getAllExpenses);

router.post("/", auth, addNewExpense);

router.put("/:id", auth, updateExpense);

router.put("/delete/:id", auth, deleteExpense);

module.exports = router;
