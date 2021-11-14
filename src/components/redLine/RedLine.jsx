import React, { useEffect, useState } from "react";
import "./redLine.scss";
const ONE_MINUTE = 60000;

const RedLine = () => {
  const [top, setTop] = useState(new Date().getMinutes());
  useEffect(() => {
    const interval = setInterval(() => {
      setTop(new Date().getMinutes());
    }, ONE_MINUTE);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="currentTimeDiv">
        <div className="circle" style={{ marginTop: `${top - 3}px` }}></div>
        <div className="currentTime" style={{ marginTop: `${top}px` }}></div>
      </div>
    </>
  );
};
export default RedLine;
