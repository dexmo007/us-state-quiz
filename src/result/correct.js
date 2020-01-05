import React from 'react';

export const emojis = ['🎉', '👍', '👌', '👏'];

export const messages = ['That is correct!', 'Duh!', 'Alright!', 'Absolutely!'];

export default function correct(props) {
  return (
    <React.Fragment>
      <div className="message">
        <span role="img" aria-label="Congratulations">
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
