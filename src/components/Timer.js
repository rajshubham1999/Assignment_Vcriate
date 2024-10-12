import React from "react";

const Timer = ({ timeRemaining }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="timer">
      <h2>Time Remaining: {formatTime(timeRemaining)}</h2>
    </div>
  );
};

export default Timer;
