import React from 'react';
import PropTypes from 'prop-types';
import { rating } from '../prop-types';

const Message = (props) => (
  <div className="message">
    <span role="img" aria-label={props.iconLabel}>
      {props.rating.emoji}
    </span>
    <span>{props.rating.message}</span>
  </div>
);

Message.propTypes = {
  iconLabel: PropTypes.string.isRequired,
  rating: rating.isRequired,
};

export default Message;
