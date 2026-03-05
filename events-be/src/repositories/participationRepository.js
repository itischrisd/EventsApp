const { Participation, User, Event } = require("../models");

const getAllParticipations = async (page, limit) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await Participation.findAndCountAll({
    limit,
    offset,
    include: [
      {
        model: User,
        attributes: ["username"]
      },
      {
        model: Event,
        attributes: ["name"]
      }
    ]
  });

  return {
    totalItems: count,
    data: rows
  };
};

const getParticipationById = async (id) => {
  return await Participation.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["username"]
      },
      {
        model: Event,
        attributes: ["name"]
      }
    ]
  });
};

const getParticipationsByEventId = async (eventId, page, limit) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await Participation.findAndCountAll({
    where: { eventId: eventId },
    limit,
    offset,
    include: [
      {
        model: User,
        attributes: ["username"]
      },
      {
        model: Event,
        attributes: ["name"]
      }
    ]
  });

  return {
    totalItems: count,
    data: rows
  };
};

const getParticipationsByUserId = async (userId, page, limit) => {
  if (!limit) {
    return await Participation.findAll({
      where: { userId: userId },
      include: [
        {
          model: User,
          attributes: ["username"]
        },
        {
          model: Event,
          attributes: ["name"]
        }
      ]
    });
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Participation.findAndCountAll({
    where: { userId: userId },
    limit,
    offset,
    include: [
      {
        model: User,
        attributes: ["username"]
      },
      {
        model: Event,
        attributes: ["name"]
      }
    ]
  });

  return {
    totalItems: count,
    data: rows
  };
};

const createParticipation = async (participationData) => {
  const createdParticipation = await Participation.create(participationData);
  return await getParticipationById(createdParticipation.id);
};

const updateParticipation = async (id, updatedData) => {
  const participation = await getParticipationById(id);
  if (!participation) return null;

  return await participation.update(updatedData);
};

const deleteParticipation = async (id) => {
  const participation = await getParticipationById(id);
  if (!participation) return null;

  await participation.destroy();
  return true;
};

module.exports = {
  getAllParticipations,
  getParticipationById,
  getParticipationsByEventId,
  getParticipationsByUserId,
  createParticipation,
  updateParticipation,
  deleteParticipation
};
