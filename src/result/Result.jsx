import React from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import propTypes from './propTypes';
import NoResult from './NoResult';
import './Result.css';

function Result(props) {
  const ResultComponent = props.rating.result
    ? props.rating.component
    : NoResult;
  return (
    <SwitchTransition>
      <CSSTransition
        key={props.rating.result || 'none'}
        addEndListener={(node, done) =>
          node.addEventListener('transitionend', done, false)
        }
        classNames="result-msg"
      >
        <div className="d-flex-v justify-center align-center">
          <ResultComponent {...props} />
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}

Result.propTypes = propTypes;

export default Result;
