import React from 'react';
import PropTypes from 'prop-types';
import './ActionBtn.css';

const ActionBtn = (props) => (
  <button
    {...props}
    className={`ActionBtn ${props.className || ''}`}
    onClick={props.onClick}
  >
    {props.icon}
  </button>
);
ActionBtn.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ActionBtn;
