import React from "react";

const ConfirmationModal = ({ startExam, examTerminated }) => {
  return (
    <div className="modal">
      <h2>Start Your Exam</h2>
      <p>
        This exam will run in full-screen mode. You must remain in full-screen
        to avoid any violations. Do you want to start the exam now?
      </p>
      <button
        onClick={startExam}
        disabled={examTerminated}
        className="start-exam-button"
      >
        Start Exam
      </button>
    </div>
  );
};

export default ConfirmationModal;
