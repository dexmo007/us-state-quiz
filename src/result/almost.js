import React from 'react';

export const emojis = ['❌', '🤔', '🤨'];
export const messages = [
  'So close!',
  'Almost!',
  'Uh - close!',
  'You just missed it!',
];

export default function almost(props) {
  return (
    <React.Fragment>
      <div className="message">
        <span role="img" aria-label="Incorrect">
          {props.rating.emoji}
        </span>
        <span>{props.rating.message}</span>
      </div>
      <button onClick={props.giveUp}>
        <span>Give up</span>
        <span role="img" aria-label="crying out loud">
          😩
        </span>
      </button>
    </React.Fragment>
  );
}
