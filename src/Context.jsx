import React, { useContext, useState } from "react";
import events from "./gateway/events";
const baseUrl = "https://616d594537f997001745d9d6.mockapi.io/api/v1/Event";

const EventContext = React.createContext();

export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [eventState, setEventState] = useState([events]);

  const fetchEvents = () =>
    fetch(baseUrl)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((eventsList) =>
        eventsList.map(({ dateFrom, dateTo, ...data }) => ({
          dateFrom: new Date(dateFrom),
          dateTo: new Date(dateTo),
          ...data,
        }))
      );

  const renderEvent = () =>
    fetchEvents().then((allEvent) => setEventState(allEvent));

  const postEvent = (eventData) =>
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create event");
        }
      })
      .then(() => renderEvent());

  const createEvent = (newEvent) => {
    postEvent(newEvent).then(() => renderEvent());
  };

  const deleteEvent = (id) => {
    fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete event");
        }
      })
      .then(() => renderEvent());
  };
  const updateEvent = (id, eventData) => {
    fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update event");
        }
      })
      .then(() => renderEvent());
  };
  return (
    <EventContext.Provider
      value={{
        eventState,
        deleteEvent,
        renderEvent,
        createEvent,
        eventState,
        updateEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
