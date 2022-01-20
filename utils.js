// Imports
const fs = require("fs");

// Constants
const JSON_PATH = `${__dirname}/accounts.json`;

// Functions
function parseUsers() {
  try {
    const buffer = fs.readFileSync(JSON_PATH);
    return JSON.parse(buffer);
  } catch (e) {
    // In case of no file return empty
    return [];
  }
}

function writeUsers(userArray) {
  fs.writeFileSync(JSON_PATH, JSON.stringify(userArray));
}

// Exports
module.exports = { parseUsers, writeUsers };
