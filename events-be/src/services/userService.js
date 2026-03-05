const { userRepository } = require("../repositories");
const { formatUser, formatUsers } = require("../dtos");
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/dotenv");

const getAllUsers = async (page, limit) => {
  const { totalItems, data } = await userRepository.getAllUsers(page, limit);
  const users = formatUsers(data);
  return {
    users,
    totalItems
  };
};

const getUserById = async (id) => {
  const user = await userRepository.getUserById(id);
  return formatUser(user);
};

const createUser = async (userData) => {
  const { username, email, password } = userData;
  const hashedPassword = await hash(password, 10);
  const newUser = await userRepository.createUser({
    username,
    email,
    password: hashedPassword
  });
  return formatUser(newUser);
};

const updateUser = async (id, updatedData) => {
  const { username, email, password } = updatedData;
  const hashedPassword = await hash(password, 10);
  const updatedUser = await userRepository.updateUser(id, {
    username,
    email,
    password: hashedPassword,
    isAdmin: false
  });
  return formatUser(updatedUser);
};

const deleteUser = async (id) => {
  await userRepository.deleteUser(id);
  return true;
};

const loginUser = async (email, password) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    return null;
  }

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  const token = jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    config.jwt.secret,
    { expiresIn: "1h" }
  );

  return {
    token,
    userId: user.id,
    isAdmin: user.isAdmin
  };
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};
