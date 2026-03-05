const formatParticipation = participation => ({
  id: participation.id,
  userId: participation.userId,
  eventId: participation.eventId,
  comment: participation.comment,
  registrationDate: participation.registrationDate,
  username: participation.User.username,
  eventName: participation.Event.name
});

const formatSimpleParticipation = participation => ({
  id: participation.id,
  userId: participation.userId,
  eventId: participation.eventId,
  username: participation.User.username,
  eventName: participation.Event.name,
  registrationDate: participation.registrationDate
});

const formatParticipations = participations => participations.map(formatSimpleParticipation);

module.exports = {
  formatParticipation,
  formatParticipations
};
