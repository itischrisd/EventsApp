const formatEvent = event => ({
  id: event.id,
  name: event.name,
  description: event.description,
  date: event.date,
  createdBy: event.createdBy,
  createdByUsername: event.User.username
});

const formatSimpleEvent = event => ({
  id: event.id,
  name: event.name,
  date: event.date
});

const formatEvents = events => events.map(formatSimpleEvent);

module.exports = {
  formatEvent,
  formatEvents
};
