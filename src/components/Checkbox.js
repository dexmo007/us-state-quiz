import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

function Checkbox(props) {
  const [id] = useState('cb-' + Math.random());
  return (
    <div style={props.style} className={props.className}>
      <input
        type="checkbox"
        id={id}
        checked={props.checked}
        onChange={props.onChange}
      ></input>
      <label htmlFor={id}>
        {props.label}
        {props.subtitle && <span>{props.subtitle}</span>}
      </label>
    </div>
  );
}
Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  subtitle: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Checkbox;
