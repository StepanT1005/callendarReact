import { copySetEvents } from "../components/calendar/Calendar";
import { getDateTime } from "../utils/dateUtils";
import events from "./events";

const baseUrl = "https://616d594537f997001745d9d6.mockapi.io/api/v1/Event";

export const createEventData = (e) => {
  const formData = Object.fromEntries(new FormData(e.target));
  const newEvent = {
    title: formData.title,
    description: formData.description,
    dateFrom: new Date(getDateTime(formData.date, formData.startTime)),
    dateTo: new Date(getDateTime(formData.date, formData.endTime)),
  };
  return newEvent;
};
