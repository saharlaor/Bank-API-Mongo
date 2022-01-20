const mongoose = require("mongoose");

const Users = mongoose.model("Users", {
  id: {
    type: String,
    required: true,
    unique: true,
  },
  cash: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    min: 0,
  },
});

module.exports = { Users };
