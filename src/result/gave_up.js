import React from 'react';
import './result.css';

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
      <span
        className="text"
        style={{ textDecoration: 'underline', padding: '1em' }}
      >
        {props.rating.correctAnswer}
      </span>
      <button className="fit-content" onClick={props.nextQuestion}>
        <span>Next Question</span>
        <span className="rocket" role="img" aria-label="Go">
          🚀
        </span>
      </button>
    </React.Fragment>
  );
}
