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

// Setup server
const app = express();
app.use(express.json());

// Endpoints
// GET
app.get("/users", getAllUsers);

app.get("/user/:id", getUser);

// POST
app.post("/user/", createUser);

// PUT
app.put("/user/deposit/:id", makeDeposit);
app.put("/user/credit/:id", updateUserCredit);
app.put("/user/withdraw/:id", makeWithdraw);
app.put("/user/transfer/", makeTransfer);

// Start server
app.listen(process.env.PORT, () =>
  console.log(`Server listening on ${process.env.PORT}`)
);
