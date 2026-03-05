import store from "../store/store.js";

export const isAdmin = () => {
  const { auth } = store.getState();
  const { isAdmin } = auth;
  return isAdmin === true;
};

export const isLoggedIn = () => {
  const { auth } = store.getState();
  const { token } = auth;
  return !!token;
};

export const isEventOwnerOrAdmin = (event) => {
  const { auth } = store.getState();
  const { userId } = auth;
  return Number(userId) === event.createdBy || isAdmin();
};

export const isParticipantOrAdmin = (participation) => {
  const { auth } = store.getState();
  const { userId } = auth;
  return Number(userId) === participation.userId || isAdmin();
};

export const isEditedUserOrAdmin = (user) => {
  const { auth } = store.getState();
  const { userId } = auth;
  return Number(userId) === user.id || isAdmin();
};
