const mongoose = require("mongoose");

const Users = mongoose.model("Users", {
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
