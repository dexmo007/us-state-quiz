import React from 'react';

export default (props) => (
  <button className="fit-content" onClick={props.giveUp}>
    <span>Give up</span>
    <span role="img" aria-label="crying out loud">
      😩
    </span>
  </button>
);
