const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_USER = process.env.MONGO_USER;

const URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.1hbae.mongodb.net/bankUsers?retryWrites=true&w=majority`;

//! If fails try taking out second option
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// module.exports.mongoClient = { client };
