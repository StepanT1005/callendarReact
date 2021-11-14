import React, { useEffect, useState } from "react";
import Event from "../event/Event";
import { formatMins } from "../../../src/utils/dateUtils.js";
import RedLine from "../redLine/RedLine";
import Modal from "../modal/Modal";
const ONE_MINUTE = 60000;

const Hour = ({ dataHour, hourEvents, dataDay }) => {
  const timeLine =
    new Date().getDate() === dataDay && new Date().getHours() === dataHour;
  const [modalStatus, setModalState] = useState(false);
  const opentModal = (e) => {
    if (e.target.className === "calendar__time-slot") {
      setModalState(true);
    }
  };

  return (
    <>
      <div
        className="calendar__time-slot"
        data-time={dataHour + 1}
        onClick={opentModal}
      >
        {!!hourEvents.length &&
          hourEvents.map(({ id, dateFrom, dateTo, title }) => {
            const eventStart = `${dateFrom.getHours()}:${formatMins(
              dateFrom.getMinutes()
            )}`;
            const eventEnd = `${dateTo.getHours()}:${formatMins(
              dateTo.getMinutes()
            )}`;
            return (
              <Event
                key={id}
                //calculating event height = duration of event in minutes
                height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
                marginTop={dateFrom.getMinutes()}
                time={`${eventStart} - ${eventEnd}`}
                title={title}
                id={id}
              />
            );
          })}
        {timeLine ? <RedLine /> : null}
      </div>
      {modalStatus ? <Modal setModalState={setModalState} /> : null}
    </>
  );
};

export default Hour;
