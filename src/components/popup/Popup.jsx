import React, { useState } from "react";
import { useEventContext } from "../../Context";
import { createEventData } from "../../gateway/createEvent";
import moment from "moment";
import "./popup.scss";
import { validate } from "../../utils/validate";

const Popup = ({ eventId, setPopupStatus }) => {
  const { deleteEvent, eventState, updateEvent } = useEventContext();
  const thisEvent = eventState.filter((elem) => elem.id === eventId)[0];
  const [title, setTitle] = useState(thisEvent.title);
  const [description, setDescription] = useState(thisEvent.description);
  const [startTime, setStartTime] = useState(
    moment(thisEvent.dateFrom).format("HH:mm")
  );
  const [endTime, setEndTime] = useState(
    moment(thisEvent.dateTo).format("HH:mm")
  );
  const [startDate, setStartDate] = useState(
    moment(thisEvent.dateFrom).format("YYYY-MM-DD")
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    const eventData = createEventData(e);
    updateEvent(eventId, eventData);
    setPopupStatus(false);
  };

  const onEventDelete = () => {
    setPopupStatus(false);
    deleteEvent(eventId);
  };
  const [text, status] = validate(startTime, endTime, startDate);

  return (
    <div className="popup " style={{ position: "absolute", zIndex: 2 }}>
      <div className="popup__content">
        {text}
        <form className="popup-form " onSubmit={handleUpdate}>
          <div
            className="popup__close-btn"
            onClick={() => setPopupStatus(false)}
          >
            &#10060;
          </div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="popup-form__field popup__title popup__input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="popup-form__time">
            <input
              type="date"
              name="date"
              className="popup-form__field popup__input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <div className="popup-form__time-elem ">
              <input
                type="time"
                name="startTime"
                className="popup-form__field popup__input"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <span className="popup-form-span">-</span>
              <input
                type="time"
                name="endTime"
                className="popup-form__field popup__input"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <textarea
            name="description"
            placeholder="Description"
            className="popup-form__field popup__input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="popup-form__edit-btn"
            disabled={status}
          >
            <i className="far fa-edit"></i>Edit
          </button>
          <span className="delete-event-btn" onClick={onEventDelete}>
            <i className="fas fa-trash"></i>
          </span>
        </form>
      </div>
    </div>
  );
};
export default Popup;
