import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect, useStore } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Result from './result/Result';
import './Game.css';
import { nextQuestion, giveUp, answer } from './store/actions';
import { chooseInput } from './components/input';
import { rating, question } from './prop-types';
import { isMobile } from 'react-device-detect';
import { resetZoom } from './util/zoom-helpers';

function Game(props) {
  const store = useStore();
  const previousResult = useRef();
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const currentResult = store.getState().rating.result;
      const changedTo = (r) =>
        previousResult.current !== r && currentResult === r;
      if (changedTo('correct') || changedTo('gave_up')) {
        if (isMobile) {
          resetZoom();
        }
      }
      previousResult.current = currentResult;
    });
    return () => unsubscribe();
  }, [store]);

  const QuizInput = chooseInput(props.question);
  return (
    <>
      <SwitchTransition>
        <CSSTransition
          key={props.question.id}
          addEndListener={(node, done) =>
            node.addEventListener('transitionend', done, false)
          }
          classNames="question-transition"
        >
          <div
            className="main"
            style={{
              width: QuizInput.fullWidth ? '100vw' : null,
            }}
          >
            <QuizInput
              question={props.question}
              rating={props.rating}
              onSubmit={props.submitAnswer}
            />
            <Result
              question={props.question}
              rating={props.rating}
              giveUp={props.giveUp}
              nextQuestion={props.nextQuestion}
              quizInput={QuizInput}
            />
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}

Game.propTypes = {
  nextQuestion: PropTypes.func.isRequired,
  submitAnswer: PropTypes.func.isRequired,
  giveUp: PropTypes.func.isRequired,
  rating: rating.isRequired,
  question: question.isRequired,
};

export default connect(
  ({ question, rating }) => ({
    question,
    rating,
  }),
  (dispatch) => ({
    nextQuestion: () => dispatch(nextQuestion()),
    giveUp: () => dispatch(giveUp()),
    submitAnswer: (answerText) => dispatch(answer(answerText)),
  })
)(Game);
