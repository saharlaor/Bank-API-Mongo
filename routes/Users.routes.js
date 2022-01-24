// Imports
const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  makeDeposit,
  updateUserCredit,
  makeWithdraw,
  makeTransfer,
} = require("../controllers/users.controllers");

const router = new express.Router();

// GET
router.get("/api/users", getAllUsers);

router.get("/api/users/:id", getUser);

// POST
router.post("/api/users", createUser);

// PUT
router.put("/api/users/deposit/:id", makeDeposit);
router.put("/api/users/credit/:id", updateUserCredit);
router.put("/api/users/withdraw/:id", makeWithdraw);
router.put("/api/users/transfer/", makeTransfer);

module.exports = router;
