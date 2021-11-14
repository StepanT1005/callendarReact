import React, { useEffect } from "react";
import { useEventContext } from "../../Context";
import Day from "../day/Day";

import "./week.scss";

const Week = ({ weekDates }) => {
  const { eventState } = useEventContext();
  const { renderEvent } = useEventContext();
  const events = eventState;

  useEffect(() => {
    renderEvent();
  }, []);
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        //getting all events from the day we will render
        const dayEvents = events.filter(
          (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
        );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
          />
        );
      })}
    </div>
  );
};

export default Week;
