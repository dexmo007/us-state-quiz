import React from 'react';

export const messages = [
  'Sorry, incorrect!',
  'Nah!',
  'Hell no!',
  'Negative!',
  'No way!',
  'Yeah, no!',
];
export const emojis = ['❌', '🤬', '🤮', '🤦‍♂️', '🤦‍♀️', '💩'];

export default function wrong(props) {
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
