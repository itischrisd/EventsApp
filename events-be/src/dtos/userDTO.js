const formatUser = user => ({
  id: user.id,
  username: user.username,
  email: user.email,
  isAdmin: user.isAdmin
});

const formatSimpleUser = user => ({
  id: user.id,
  username: user.username
});

const formatUsers = users => users.map(formatSimpleUser);

module.exports = {
  formatUser,
  formatUsers
};
