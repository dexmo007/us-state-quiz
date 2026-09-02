import { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { resultComponentMap, type ResultComponentName } from '~/quiz/results';
import NoResult from './NoResult';
import './Result.css';
import type ResultProps from './props';

function Result(
  props: Omit<ResultProps, 'rating'> & Partial<Pick<ResultProps, 'rating'>>
) {
  const ResultComponent = props.rating
    ? resultComponentMap[props.rating.component as ResultComponentName] // TODO type safe prop
    : NoResult;
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <SwitchTransition>
      <CSSTransition
        key={props.rating?.result || 'none'}
        nodeRef={nodeRef}
        addEndListener={(done) =>
          nodeRef.current?.addEventListener('transitionend', done, false)
        }
        classNames="result-msg"
      >
        <div ref={nodeRef} className="d-flex-v justify-center align-center">
          {props.rating ? (
            <ResultComponent {...props} rating={props.rating} />
          ) : (
            <NoResult />
          )}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}

export default Result;
