const { User } = require("../models");

const getAllUsers = async (page, limit) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await User.findAndCountAll({
    limit,
    offset
  });

  return {
    totalItems: count,
    data: rows
  };
};

const getUserById = async (id) => {
  return await User.findByPk(id);
};

const getUserByEmail = async (email) => {
  return await User.findOne({
    where: { email: email }
  });
};

const createUser = async (userData) => {
  return User.create(userData);
};

const updateUser = async (id, updatedData) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  return await user.update(updatedData);
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.destroy();
  return true;
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
};
