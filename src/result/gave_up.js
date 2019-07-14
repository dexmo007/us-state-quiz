import React from 'react';

export default function gave_up(props) {
  return (
    <React.Fragment>
      <div className="message">
        <span role="img" aria-label="Incorrect">
          🧐
        </span>
        <span>The correct answer would've been:</span>
      </div>
      <span className="text" style={{ textDecoration: 'underline' }}>
        {props.rating.correctAnswer}
      </span>
      <button onClick={props.nextQuestion}>
        <span>Next Question</span>
        <span className="rocket" role="img" aria-label="Go">
          🚀
        </span>
      </button>
    </React.Fragment>
  );
}
