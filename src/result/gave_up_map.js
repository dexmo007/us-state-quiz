import React from 'react';
import './result.css';

export const emojis = ['🧐'];
export const messages = ['Look at the map!', 'The map reveals the answer!'];

export default function gave_up_map(props) {
  return (
    <React.Fragment>
      <div className="message">
        <span role="img" aria-label="Incorrect">
          {props.rating.emoji}
        </span>
        <span>{props.rating.message}</span>
      </div>
      <button className="fit-content" onClick={props.nextQuestion}>
        <span>Next Question</span>
        <span className="rocket" role="img" aria-label="Go">
          🚀
        </span>
      </button>
    </React.Fragment>
  );
}
