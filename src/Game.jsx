import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Result from './result/Result';
import './Game.css';
import { nextQuestion, giveUp, answer } from './store/actions';
import { chooseInput } from './components/input';
import { rating, question } from './prop-types';

class Game extends React.Component {
  render() {
    const QuizInput = chooseInput(this.props.question);
    return (
      <>
        <SwitchTransition>
          <CSSTransition
            key={this.props.question.id}
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
                question={this.props.question}
                rating={this.props.rating}
                onSubmit={this.props.submitAnswer}
              />
              <Result
                question={this.props.question}
                rating={this.props.rating}
                giveUp={this.props.giveUp}
                nextQuestion={this.props.nextQuestion}
                quizInput={QuizInput}
              />
            </div>
          </CSSTransition>
        </SwitchTransition>
      </>
    );
  }
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
