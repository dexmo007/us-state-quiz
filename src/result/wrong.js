import React from 'react';

export default function wrong(props) {
  return (
    <React.Fragment>
      <div className="message">
        <span role="img" aria-label="Incorrect">
          ❌
        </span>
        <span>Sorry, incorrect!</span>
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
