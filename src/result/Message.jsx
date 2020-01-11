import React from 'react';

export default (props) => (
  <div className="message">
    <span role="img" aria-label={props.iconLabel}>
      {props.rating.emoji}
    </span>
    <span>{props.rating.message}</span>
  </div>
);
