import axios from "axios";
import { logout } from "../store/authSlice.js";
import store from "../store/store.js";
import { showToast } from "../store/toastSlice.js";
import i18n from "../i18n";

function redirectTo(url) {
  window.location.href = url;
}

const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  (config) => {
    const { auth } = store.getState();
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  (error) => {
    if (!error.response) {
      store.dispatch(showToast({
        title: i18n.t("something-went-wrong")
      }));
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const errorTitle = data?.message || data?.error || i18n.t("something-went-wrong");

    if (status === 401) {
      store.dispatch(logout());
      redirectTo("/unauthorized");
    } else if (status === 403) {
      redirectTo("/unauthorized");
    } else if (status === 404) {
      redirectTo("/not-found");
    } else {
      store.dispatch(
        showToast({
          title: errorTitle
        })
      );
    }

    return Promise.reject(error);
  }
);

export const fetchEvents = (page, limit) => api.get(`/events?page=${page}&limit=${limit}`);
export const getEvent = id => api.get(`/events/${id}`);
export const getEventParticipations = (id, page, limit) => api.get(`/events/${id}/participations?page=${page}&limit=${limit}`);
export const createEvent = eventData => api.post(`/events`, eventData);
export const updateEvent = (id, eventData) => api.put(`/events/${id}`, eventData);
export const deleteEvent = id => api.delete(`/events/${id}`);

export const fetchUsers = (page, limit) => api.get(`/users?page=${page}&limit=${limit}`);
export const getUser = id => api.get(`/users/${id}`);
export const getUserParticipations = (id, page, limit) => {
  if (!limit) {
    return api.get(`/users/${id}/participations`);
  }
  return api.get(`/users/${id}/participations?page=${page}&limit=${limit}`);
};
export const createUser = userData => api.post(`/users`, userData);
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const deleteUser = id => api.delete(`/users/${id}`);

export const fetchParticipations = (page, limit) => api.get(`/participations?page=${page}&limit=${limit}`);
export const getParticipation = id => api.get(`/participations/${id}`);
export const createParticipation = participationData => api.post(`/participations`, participationData);
export const updateParticipation = (id, participationData) => api.put(`/participations/${id}`, participationData);
export const deleteParticipation = id => api.delete(`/participations/${id}`);

export const loginUser = credentials => api.post(`/login`, credentials);
