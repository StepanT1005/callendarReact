import React, { useState } from "react";
import Popup from "../popup/Popup";

import "./event.scss";

const Event = ({ height, marginTop, title, time, id }) => {
  const [popupStatus, setPopupStatus] = useState(false);
  const eventStyle = {
    height,
    marginTop,
  };
  const openPopup = () => {
    setPopupStatus(true);
  };
  return (
    <>
      <div style={eventStyle} className="event" onClick={openPopup}>
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
      </div>
      {popupStatus && (
        <Popup
          eventId={id}
          setPopupStatus={setPopupStatus}
          popupStatus={popupStatus}
        />
      )}
    </>
  );
};

export default Event;
