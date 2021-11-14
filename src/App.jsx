import React, { Component, useEffect, useState } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";

import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";
import { EventProvider } from "./Context.jsx";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(
    getWeekStartDate(new Date())
  );

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
  return (
    <>
      <EventProvider>
        <Header
          weekStartDate={weekStartDate}
          setWeekStartDate={setWeekStartDate}
        />
        <Calendar weekDates={weekDates} setWeekStartDate={setWeekStartDate} />
      </EventProvider>
    </>
  );
};

export default App;
