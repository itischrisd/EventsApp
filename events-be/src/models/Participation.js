const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Participation = sequelize.define("Participation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id"
    },
    onDelete: "CASCADE"
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Events",
      key: "id"
    },
    onDelete: "CASCADE"
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  registrationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "Participations",
  timestamps: true,
  paranoid: true,
  createdAt: false,
  updatedAt: false,
  deletedAt: "deletedAt"
});

module.exports = Participation;
