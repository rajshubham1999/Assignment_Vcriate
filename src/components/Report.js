import React from "react";

const Report = ({ examTerminated, examCompleted, violations, resetExam }) => {
  return (
    <div className="report">
      <h2>Exam Report</h2>
      <p>Status: {examCompleted ? "Completed" : "Terminated"}</p>
      <p>Violations: {violations}</p>
      {/* <button onClick={resetExam} className="reset-button">
        Reset and Restart Exam
      </button> */}
    </div>
  );
};

export default Report;
