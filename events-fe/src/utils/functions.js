import { format } from "date-fns";

function capitalizeFirstLetter(str) {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

function dateWithHour(date) {
  return format(new Date(date), "dd-MM-yyyy HH:mm");
}

function dateWithHourNoTimezone(date) {
  return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
}

export {
  capitalizeFirstLetter,
  dateWithHour,
  dateWithHourNoTimezone
};
