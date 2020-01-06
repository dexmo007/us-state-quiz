import React from 'react';
import './result.css';

export default function none(props) {
  return (
    <React.Fragment>
      <div
        className="message"
        aria-hidden="true"
        style={{ visibility: 'hidden' }}
      >
        <span role="img" aria-hidden="true">
          ❌
        </span>
        <span>No result</span>
      </div>
      <button className="fit-content" aria-hidden="true" onClick={props.giveUp}>
        <span role="img" aria-labelledby="brainfuck">
          🤯
        </span>
        <span>Don't know</span>
      </button>
    </React.Fragment>
  );
}
