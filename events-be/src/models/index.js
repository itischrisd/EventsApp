const User = require("./User");
const Event = require("./Event");
const Participation = require("./Participation");

User.hasMany(Event, { foreignKey: "createdBy" });
Event.belongsTo(User, { foreignKey: "createdBy" });

Event.hasMany(Participation, { foreignKey: "eventId" });
Participation.belongsTo(Event, { foreignKey: "eventId" });

User.hasMany(Participation, { foreignKey: "userId" });
Participation.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  User,
  Event,
  Participation
};
