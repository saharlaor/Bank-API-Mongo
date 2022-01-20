const utils = require("./utils");
const { validateUserExists } = require("./helpers");

// Functions
const getAllUsers = (req, res) => {
  res.send(utils.parseUsers());
};

const getUser = (req, res) => {
  const user = utils
    .parseUsers()
    .find((item) => item.id === parseInt(req.params.id));
  user
    ? res.send(user)
    : res.status(404).send(`User ${req.params.id} not found`);
};

const createUser = (req, res) => {
  const users = utils.parseUsers();
  const newUser = {
    id: req.body.id,
    cash: 0,
    credit: 0,
  };
  if (!validateUserExists(users, newUser)) {
    users.push(newUser);
    res.status(200).send(newUser);
  } else {
    res.status(400).send("400 - User already exists");
  }

  utils.writeUsers(users);
};

const makeDeposit = (req, res) => {
  const users = utils.parseUsers();
  const user = users.find((item) => item.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send(`User ${req.params.id} not found`);
  } else if (req.body.amount < 0 || !req.body.amount) {
    res.status(400).send("Invalid amount");
  } else {
    user.cash += req.body.amount;
    res.status(200).send(user);
  }

  utils.writeUsers(users);
};

const updateUserCredit = (req, res) => {
  const users = utils.parseUsers();
  const user = users.find((item) => item.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send(`User ${req.params.id} not found`);
  } else if (req.body.amount < 0 || !req.body.amount) {
    res.status(400).send("Invalid amount");
  } else {
    user.credit = req.body.amount;
    res.status(200).send(user);
  }
  utils.writeUsers(users);
};

const makeWithdraw = (req, res) => {
  const users = utils.parseUsers();
  const user = users.find((item) => item.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send(`User ${req.params.id} not found`);
  } else if (req.body.amount < 0 || !req.body.amount) {
    res.status(400).send("Invalid amount");
  } else if (user.credit + user.cash - req.body.amount < 0) {
    res.status(400).send("Not enough credit");
  } else {
    user.cash -= req.body.amount;
    res.status(200).send(user);
  }

  utils.writeUsers(users);
};

const makeTransfer = (req, res) => {
  const users = utils.parseUsers();
  const fromUser = users.find((item) => item.id === parseInt(req.body.fromID));
  const toUser = users.find((item) => item.id === parseInt(req.body.toID));
  if (!fromUser) {
    res.status(404).send(`User ${req.body.fromID} not found`);
  } else if (!toUser) {
    res.status(404).send(`User ${req.body.toID} not found`);
  } else if (req.body.amount < 0 || !req.body.amount) {
    res.status(400).send("Invalid amount");
  } else if (fromUser.credit + fromUser.cash - req.body.amount < 0) {
    res.status(400).send("Not enough credit");
  } else {
    fromUser.cash -= req.body.amount;
    toUser.cash += req.body.amount;
    res.status(200).send({ fromUser, toUser });
  }

  utils.writeUsers(users);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  makeDeposit,
  updateUserCredit,
  makeWithdraw,
  makeTransfer,
};
