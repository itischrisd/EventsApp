const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: "Users",
  timestamps: true,
  paranoid: true,
  createdAt: false,
  updatedAt: false,
  deletedAt: "deletedAt",
  hooks: {
    async afterDestroy(instance) {
      const participations = await instance.getParticipations();
      await Promise.all(participations.map(participation => participation.destroy()));
      const events = await instance.getEvents();
      await Promise.all(events.map(event => event.destroy()));
    }
  }
});

module.exports = User;
