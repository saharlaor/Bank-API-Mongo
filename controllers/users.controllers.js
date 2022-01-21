const { Users } = require("../models/Users.model");
require("../db/mongoose");

// Functions
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(`An error occurred in the server\n\n\n${err}`);
  }
};

const getUser = (req, res) => {
  try {
    const user = Users.findOne({ _id: req.params.id });
    if (user._id) return res.send(user);
    throw Error({ status: 404, message: `User ${req.params.id} not found` });
  } catch (err) {
    err.status
      ? res.status(err.status).send(err.message)
      : res.status(500).send(`An error occurred in the server\n\n\n${err}`);
  }
};

const createUser = (req, res) => {
  try {
    const newUser = new Users({
      name: req.body.name,
      cash: 0,
      credit: 0,
    });
    newUser.save((err, data) => {
      if (err) {
        throw Error({
          status: 400,
          message: `User ${req.params.id} alreadyExists`,
        });
      } else {
        res.status(201).send(data);
      }
    });
  } catch (err) {
    err.status
      ? res.status(err.status).send(err.message)
      : res.status(500).send(`An error occurred in the server\n\n\n${err}`);
  }
};

const makeDeposit = (req, res) => {
  try {
    const user = Users.findOne({ _id: req.params.id });
    // If _id is empty there is no user
    if (!user._id) {
      throw Error({ status: 404, message: `User ${req.params.id} not found` });
    } else if (req.body.amount < 0 || !req.body.amount) {
      throw Error({ status: 400, message: `Invalid amount` });
    } else {
      user.cash += req.body.amount;
      res.status(200).send(user);
    }
  } catch (err) {
    err.status
      ? res.status(err.status).send(err.message)
      : res.status(500).send(`An error occurred in the server\n\n\n${err}`);
  }
};

const updateUserCredit = (req, res) => {
  try {
    const user = Users.findOne({ _id: req.params.id });
    // If _id is empty there is no user
    if (!user._id) {
      throw Error({ status: 404, message: `User ${req.params.id} not found` });
    } else if (req.body.amount < 0 || !req.body.amount) {
      throw Error({ status: 400, message: `Invalid amount` });
    } else {
      user.credit = req.body.amount;
      res.status(200).send(user);
    }
  } catch (err) {
    err.status
      ? res.status(err.status).send(err.message)
      : res.status(500).send(`An error occurred in the server\n\n\n${err}`);
  }
};

const makeWithdraw = (req, res) => {
  try {
    const user = Users.findOne({ _id: req.params.id });
    // If _id is empty there is no user
    if (!user._id) {
      throw Error({ status: 404, message: `User ${req.params.id} not found` });
    } else if (req.body.amount < 0 || !req.body.amount) {
      throw Error({ status: 400, message: `Invalid amount` });
    } else if (user.credit + user.cash - req.body.amount < 0) {
      throw Error({ status: 400, message: `Insufficient credit` });
    } else {
      user.cash -= req.body.amount;
      res.status(200).send(user);
    }
  } catch (err) {
    err.status
      ? res.status(err.status).send(err.message)
      : res.status(500).send(`An error occurred in the server\n\n\n${err}`);
  }
};

const makeTransfer = (req, res) => {
  try {
    const fromUser = Users.findOne({ _id: req.body.fromID });
    const toUser = Users.findOne({ _id: req.body.toID });
    if (!fromUser._id) {
      throw Error({
        status: 404,
        message: `User ${req.body.fromID} not found`,
      });
    } else if (!toUser._id) {
      throw Error({ status: 404, message: `User ${req.body.toID} not found` });
    } else if (req.body.amount < 0 || !req.body.amount) {
      throw Error({ status: 400, message: `Invalid amount` });
    } else if (fromUser.credit + fromUser.cash - req.body.amount < 0) {
      throw Error({ status: 400, message: `Insufficient credit` });
    } else {
      fromUser.cash -= req.body.amount;
      toUser.cash += req.body.amount;
      res.status(200).send({ fromUser, toUser });
    }
  } catch (err) {
    err.status
      ? res.status(err.status).send(err.message)
      : res.status(500).send(`An error occurred in the server\n\n\n${err}`);
  }
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
