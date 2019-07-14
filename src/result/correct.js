import React from 'react';

export default function correct(props) {
  return (
    <React.Fragment>
      <div className="message">
        <span role="img" aria-label="Congratulations">
          🎉
        </span>
        <span>That is correct!</span>
      </div>
      <button onClick={props.nextQuestion}>
        <span>Next Question</span>
        <span className="rocket" role="img" aria-label="Go">
          🚀
        </span>
      </button>
    </React.Fragment>
  );
}
