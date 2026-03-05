const { participationRepository } = require("../repositories");
const { formatParticipation, formatParticipations } = require("../dtos");

const getAllParticipations = async (page, limit) => {
  const { totalItems, data } = await participationRepository.getAllParticipations(page, limit);
  const participations = formatParticipations(data);

  return {
    participations,
    totalItems
  };
};

const getParticipationById = async (participationId) => {
  const participation = await participationRepository.getParticipationById(participationId);
  return formatParticipation(participation);
};

const getParticipationsByEventId = async (eventId, page, limit) => {
  const { totalItems, data } = await participationRepository.getParticipationsByEventId(eventId, page, limit);
  const participations = formatParticipations(data);

  return {
    participations,
    totalItems
  };
};

const getParticipationsByUserId = async (userId, page, limit) => {
  const { totalItems, data } = await participationRepository.getParticipationsByUserId(userId, page, limit);
  const participations = formatParticipations(data);

  return {
    participations,
    totalItems
  };
};

const createParticipation = async (participationData, userId) => {
  participationData.id = null;
  participationData.userId = userId;
  const newParticipation = await participationRepository.createParticipation(participationData);
  return formatParticipation(newParticipation);
};

const updateParticipation = async (id, updatedData, userId) => {
  updatedData.userId = userId;
  const updatedParticipation = await participationRepository.updateParticipation(id, updatedData);
  return formatParticipation(updatedParticipation);
};

const deleteParticipation = async (id) => {
  return participationRepository.deleteParticipation(id);
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
