import React, { Component, useState } from "react";
import "./modal.scss";
import events from "../../gateway/events";
import { useEventContext } from "../../Context";
import { createEventData } from "../../gateway/createEvent";
import moment from "moment";
import { validate } from "../../utils/validate";

const Modal = ({ modalState, setModalState }) => {
  const [startTime, setStartTime] = useState(
    moment(new Date()).format("HH:mm")
  );
  const [endTime, setEndTime] = useState(moment(new Date()).format("HH:mm"));
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const { createEvent } = useEventContext();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const eventData = createEventData(e);
    createEvent(eventData);
    setModalState(false);
  };
  const [text, status] = validate(startTime, endTime, startDate);

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button
            className="create-event__close-btn"
            onClick={() => setModalState(false)}
          >
            +
          </button>
          <form className="event-form" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
              {text}
            </div>

            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
            ></textarea>
            <button
              type="submit"
              className="event-form__submit-btn"
              disabled={status}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
