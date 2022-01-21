// Imports
const express = require("express");
const cors = require("cors");
const {
  getAllUsers,
  getUser,
  createUser,
  makeDeposit,
  updateUserCredit,
  makeWithdraw,
  makeTransfer,
} = require("./controllers/users.controllers");
const path = require("path");

// Constants
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const PUBLIC_PATH = path.join(__dirname, "client/build");

// Setup server
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(PUBLIC_PATH));

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

// Fallback
app.get("*", (req, res) => {
  res.sendFile(path.resolve(publicPath, "index.html"));
});

// Start server
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
