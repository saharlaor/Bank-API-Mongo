const mongoose = require("mongoose");

const Users = mongoose.model("Users", {
  name: {
    type: String,
    required: true,
  },
  cash: {
    type: Number,
    default: 0,
    required: true,
  },
  credit: {
    type: Number,
    min: 0,
    required: true,
  },
});

module.exports = { Users };
