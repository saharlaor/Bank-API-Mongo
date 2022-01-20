// Functions
function validateUserExists(users, user) {
  console.log(`user`, user);
  const userIndex = users.findIndex(({ id }) => id === user.id);
  return userIndex !== -1;
}

module.exports = { validateUserExists };
