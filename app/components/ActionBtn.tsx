import type React from 'react';
import './ActionBtn.css';

interface ActionBtnProps {
  icon: React.ReactNode;
  onClick(): void;
  className?: string;
  style?: React.CSSProperties;
}

const ActionBtn = (props: ActionBtnProps) => (
  <button
    {...props}
    className={`ActionBtn ${props.className || ''}`}
    onClick={props.onClick}
  >
    {props.icon}
  </button>
);
export default ActionBtn;
