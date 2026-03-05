const { eventRepository } = require("../repositories");
const { formatEvent, formatEvents } = require("../dtos");

const getAllEvents = async (page, limit) => {
  const { totalItems, data } = await eventRepository.getAllEvents(page, limit);
  const events = formatEvents(data);
  return {
    events,
    totalItems
  };
};

const getEventById = async (id) => {
  const event = await eventRepository.getEventById(id);
  return formatEvent(event);
};

const createEvent = async (eventData, createdBy) => {
  eventData.id = null;
  eventData.createdBy = createdBy;
  const newEvent = await eventRepository.createEvent(eventData);
  return formatEvent(newEvent);
};

const updateEvent = async (id, updatedData, createdBy) => {
  updatedData.createdBy = createdBy;
  const updatedEvent = await eventRepository.updateEvent(id, updatedData);
  return formatEvent(updatedEvent);
};

const deleteEvent = async (id) => {
  return eventRepository.deleteEvent(id);
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
