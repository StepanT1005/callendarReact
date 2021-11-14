import React, { useState } from "react";
import moment from "moment";

import { getDisplayedMonth } from "../../utils/dateUtils.js";
import Modal from "../modal/Modal.jsx";

import "./header.scss";
const Header = ({ weekStartDate, setWeekStartDate }) => {
  const [modalState, setModalState] = useState(false);
  const handleWeekChange = (direction) => {
    if (direction === "today") {
      setWeekStartDate(new Date());
      return;
    }
    const weekStart =
      direction === "next"
        ? new Date(moment(weekStartDate).add(1, "week"))
        : new Date(moment(weekStartDate).subtract(1, "week"));
    setWeekStartDate(weekStart);
  };

  return (
    <header className="header">
      <button
        className="button create-event-btn"
        onClick={() => setModalState(true)}
      >
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button
          className="navigation__today-btn button"
          onClick={() => handleWeekChange("today")}
        >
          Today
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={() => handleWeekChange("last")}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={() => handleWeekChange("next")}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">
          {getDisplayedMonth(weekStartDate)}
        </span>
      </div>
      {modalState && (
        <Modal modalState={modalState} setModalState={setModalState} />
      )}
    </header>
  );
};

export default Header;
