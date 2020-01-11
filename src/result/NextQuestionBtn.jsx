import React from 'react';

export default (props) => (
  <button className="fit-content" onClick={props.nextQuestion}>
    <span>Next Question</span>
    <span className="rocket" role="img" aria-label="Go">
      🚀
    </span>
  </button>
);
