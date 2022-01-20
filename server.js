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
} = require("./routes");

// Constants
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// Setup server
const app = express();
app.use(express.json());

// Endpoints
// GET
app.get("/api/users", getAllUsers);

app.get("/api/user/:id", getUser);

// POST
app.post("/api/user/", createUser);

// PUT
app.put("/api/user/deposit/:id", makeDeposit);
app.put("/api/user/credit/:id", updateUserCredit);
app.put("/api/user/withdraw/:id", makeWithdraw);
app.put("/api/user/transfer/", makeTransfer);

// Start server
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
