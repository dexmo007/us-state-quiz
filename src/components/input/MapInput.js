import React from 'react';
import classNames from 'classnames';
import propTypes from './propTypes';
import USMap from '../us-map';
import './index.css';

function MapInput(props) {
  return (
    <React.Fragment>
      <span className="question">{props.question.message}</span>
      <USMap
        key={Math.random()}
        className={classNames('answer', props.rating.result)}
        style={{ height: 'auto' }}
        readOnly={
          props.rating.result === 'correct' || props.rating.result === 'gave_up'
        }
        highlight={
          props.rating.result === 'correct' || props.rating.result === 'gave_up'
            ? props.rating.correctAnswer
            : null
        }
        onClick={(e) => {
          props.onSubmit(e.target.dataset.name);
        }}
      ></USMap>
    </React.Fragment>
  );
}
MapInput.propTypes = propTypes;
MapInput.fullWidth = true;
export default MapInput;
