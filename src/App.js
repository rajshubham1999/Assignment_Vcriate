
import React, { useState, useEffect } from "react";
import Timer from "./components/Timer";
import ViolationModal from "./components/ViolationModal";
import "./App.css";

function App() {
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [violations, setViolations] = useState(0);
  const [showViolationModal, setShowViolationModal] = useState(false);
  const [violationTimer, setViolationTimer] = useState(10);
  const [examTerminated, setExamTerminated] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [showViolationMessage, setShowViolationMessage] = useState(false);

  useEffect(() => {
    if (timeRemaining <= 0 && !examSubmitted) {
      submitExam();
    }
  }, [timeRemaining, examSubmitted]);

  // Fullscreen change handler
  const handleFullScreenChange = () => {
    if (!document.fullscreenElement && !examTerminated && !examSubmitted) {
      handleViolation();
    }
  };

  // Visibility change handler
  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden" && !examTerminated && !examSubmitted) {
      handleViolation();
    }
  };

  // Trigger violation if fullscreen or visibility state changes
  useEffect(() => {
    document.onfullscreenchange = handleFullScreenChange;
    document.onvisibilitychange = handleVisibilityChange;

    return () => {
      document.onfullscreenchange = null;
      document.onvisibilitychange = null;
    };
  }, [violations, examTerminated, examSubmitted]);

  const handleViolation = () => {
    setViolations((prev) => prev + 1);
    setShowViolationMessage(true);

    setTimeout(() => {
      setShowViolationMessage(false);
    }, 2000);

    if (violations + 1 >= 3) {
      terminateExam();
    } else {
      setShowViolationModal(true);
    }
  };

  // Function to start the exam with a native confirm dialog
  const startExam = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to start the exam? You cannot leave full-screen mode once the exam starts."
    );

    if (userConfirmed) {
      if (!examTerminated && !examSubmitted) {
        const docEl = document.documentElement;
        

        if (docEl.requestFullscreen) {
          docEl.requestFullscreen().catch((error) => {
            console.error("Error requesting fullscreen:", error);
          });
        } else if (docEl.mozRequestFullScreen) { 
          docEl.mozRequestFullScreen().catch((error) => {
            console.error("Error requesting fullscreen in Firefox:", error);
          });
        } else if (docEl.webkitRequestFullscreen) { 
          docEl.webkitRequestFullscreen().catch((error) => {
            console.error("Error requesting fullscreen in Chrome/Safari/Opera:", error);
          });
        } else if (docEl.msRequestFullscreen) { 
          docEl.msRequestFullscreen().catch((error) => {
            console.error("Error requesting fullscreen in IE/Edge:", error);
          });
        } else {
          console.error("Fullscreen API is not supported in this browser.");
        }

        setIsFullScreen(true);
        const timer = setInterval(() => {
          setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(timer);
      }
    }
  };

  const terminateExam = () => {
    setExamTerminated(true);
    setIsFullScreen(false);
    document.exitFullscreen().catch((error) => {
      console.error("Error exiting fullscreen:", error); 
    });
    setShowViolationModal(false);
  };

  const submitExam = () => {
    setExamSubmitted(true);
    setIsFullScreen(false);
    document.exitFullscreen().catch((error) => {
      console.error("Error exiting fullscreen:", error);
    });
    setShowViolationModal(false);
  };

  const handleReturnToFullScreen = () => {
    const docEl = document.documentElement;
    
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch((error) => {
        console.error("Error requesting fullscreen:", error);
      });
    } else if (docEl.mozRequestFullScreen) {
      docEl.mozRequestFullScreen().catch(console.error);
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen().catch(console.error);
    } else if (docEl.msRequestFullscreen) {
      docEl.msRequestFullscreen().catch(console.error);
    }

    setShowViolationModal(false);
    setViolationTimer(10);
  };

  useEffect(() => {
    let countdown;
    if (showViolationModal) {
      setViolationTimer(10);
      countdown = setInterval(() => {
        setViolationTimer((prevTime) => {
          if (prevTime <= 1) {
            terminateExam();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [showViolationModal]);

  return (
    <div className="App">
      {!isFullScreen && !examTerminated && !examSubmitted ? (
        <button onClick={startExam} className="start-button">
          Start Exam
        </button>
      ) : examTerminated ? (
        <h1 className="terminated">Exam Terminated!</h1>
      ) : examSubmitted ? (
        <h1 className="submitted">Exam Submitted!</h1>
      ) : (
        <div className="exam-screen">
          <Timer timeRemaining={timeRemaining} />
          <p className="instruction">
            Complete your exam without leaving full-screen mode.
          </p>
          <button className="submit-button" onClick={submitExam}>
            Submit Exam
          </button>

          <div className="violation-counter">Violation Limit - 3</div>

          {showViolationModal && !examTerminated && (
            <ViolationModal
              violationTimer={violationTimer}
              handleReturnToFullScreen={handleReturnToFullScreen}
            />
          )}

          {showViolationMessage && (
            <div className="violation-message">
              Violation detected - {violations}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
