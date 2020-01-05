import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import data from './data.json';
import './USMap.css';

function USMap(props) {
  return (
    <svg
      className={`USMap ${props.className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={data.viewBox}
      style={props.style}
    >
      <g>
        {data.paths.map(({ state, path }) => (
          <path
            key={state}
            data-name={state}
            d={path}
            fill={
              props.highlight === state
                ? props.highlightedFill || '#bd3d44'
                : props.stateFill || '#d3d3d3'
            }
            className={classNames({ readonly: props.readOnly })}
            onClick={(e) => {
              if (props.onClick && !props.readOnly) props.onClick(e);
            }}
          ></path>
        ))}
      </g>
    </svg>
  );
}

USMap.propTypes = {
  onClick: PropTypes.func,
  stateFill: PropTypes.string,
  highlightedFill: PropTypes.string,
  highlight: PropTypes.string,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default USMap;
