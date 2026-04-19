import React, { useState, useRef, useEffect } from "react";

const InterviewChat = ({
  question,
  questionNumber,
  totalQuestions,
  isListening,
  setIsListening,
  handleNext,
  handleEnd
}) => {
  const [answer, setAnswer] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        setAnswer(event.results[0][0].transcript);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [setIsListening]);

  const startListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported");
      return;
    }

    recognitionRef.current.start();
    setIsListening(true);
  };

  const onNextClick = () => {
    if(!answer.trim()) {
      alert("Please provide an answer before continuing.");
      return;
    }
    handleNext(answer);      // PASS ANSWER BACK UP
    setAnswer("");     // reset input
  };

  return (
    <div className="chat-box">
      <div className="question-panel">
        <p className="question-number">
          Question {questionNumber} of {totalQuestions}
        </p>
        <h3>{question}</h3>
      </div>

      <div className="input-section">
        <textarea
          placeholder="Type your answer here"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button
          className={`mic-button ${isListening ? "mic-active" : ""}`}
          onClick={startListening}
        >
          🎤
        </button>
      </div>

      <div className="action-buttons">
        <button className="next-btn" onClick={onNextClick}>
          Next Question
        </button>

        <button className="end-btn" onClick={handleEnd}>
          End Interview
        </button>
      </div>
    </div>
  );
};

export default InterviewChat;