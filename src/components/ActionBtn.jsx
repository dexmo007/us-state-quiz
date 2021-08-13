import React from 'react';
import PropTypes from 'prop-types';
import './ActionBtn.css';

const ActionBtn = (props) => (
  <button className="ActionBtn" onClick={props.onClick} {...props}>
    {props.icon}
  </button>
);
ActionBtn.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ActionBtn;
