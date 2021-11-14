import moment from "moment";
import React, { useEffect, useState } from "react";
const ONE_MINUTE = 60000;

export const validate = (startTime, endTime, startDate) => {
  const startEventTime = new Date(moment(`${startDate} ${startTime}`).format());
  const endEventTime = new Date(moment(`${startDate} ${endTime}`).format());
  const diffTime = (endEventTime - startEventTime) / ONE_MINUTE;
  console.log(endTime);

  const [buttonStatus, setButtonStatus] = useState(false);
  if (diffTime > 360) {
    return ["the duration of the event should not exceed 5 hours", true];
  }
  if (
    startEventTime.getMinutes() % 15 !== 0 ||
    endEventTime.getMinutes() % 15 !== 0
  ) {
    return ["time must be a multiple of 15", true];
  }

  return [null, false];
};
