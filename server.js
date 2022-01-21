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
} = require("./controllers/users.controllers");

// Constants
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// Setup server
const app = express();
app.use(express.json());

// Endpoints
// GET
app.get("/api/users", getAllUsers);

app.get("/api/users/:id", getUser);

// POST
app.post("/api/users", createUser);

// PUT
app.put("/api/users/deposit/:id", makeDeposit);
app.put("/api/users/credit/:id", updateUserCredit);
app.put("/api/users/withdraw/:id", makeWithdraw);
app.put("/api/users/transfer/", makeTransfer);

// Start server
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
