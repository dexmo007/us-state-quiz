import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import data from './data.json';
import './USMap.css';
import SvgView from '../SvgView';

function USMap(props) {
  return (
    <SvgView
      style={{
        ...props.style,
        height: '100%',
        display: 'block',
      }}
      viewBox={data.viewBox}
      for={(svgViewProps, { panned }) => (
        <svg
          className={`USMap ${props.className || ''}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: '100%', width: '100%' }}
          {...svgViewProps}
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
                  if (props.onClick && !props.readOnly && !panned)
                    props.onClick(e);
                }}
              ></path>
            ))}
          </g>
        </svg>
      )}
    />
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
