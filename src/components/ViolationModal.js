import React from "react";

const ViolationModal = ({ violationTimer, handleReturnToFullScreen }) => {
  return (
    <div className="modal">
      <h2>Violation Detected!</h2>
      <p>You have {violationTimer} seconds to return to full-screen mode.</p>
      <button onClick={handleReturnToFullScreen}>Return to Full-Screen</button>
    </div>
  );
};

export default ViolationModal;
