import React, { useState } from 'react';
import './Checkbox.css';

interface CheckboxProps {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
  subtitle?: string;
  style?: React.CSSProperties;
  className?: string;
}

function Checkbox(props: CheckboxProps) {
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
export default Checkbox;
