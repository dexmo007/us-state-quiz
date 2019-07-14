import React from 'react';

export const emojis = ['🧐'];
export const messages = ["The correct answer would've been:"];

export default function gave_up(props) {
  return (
    <React.Fragment>
      <div className="message">
        <span role="img" aria-label="Incorrect">
          {props.rating.emoji}
        </span>
        <span>{props.rating.message}</span>
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
