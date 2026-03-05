const { Event, User } = require("../models");

const getAllEvents = async (page, limit) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await Event.findAndCountAll({
    limit,
    offset
  });

  return {
    totalItems: count,
    data: rows
  };
};

const getEventById = async (id) => {
  return await Event.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["username"]
      }
    ]
  });
};

const createEvent = async (eventData) => {
  const createdEvent = await Event.create(eventData);
  return await getEventById(createdEvent.id);
};

const updateEvent = async (id, updatedData) => {
  const event = await getEventById(id);
  if (!event) return null;

  return await event.update(updatedData);
};

const deleteEvent = async (id) => {
  const event = await getEventById(id);
  if (!event) return null;

  await event.destroy();
  return true;
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
