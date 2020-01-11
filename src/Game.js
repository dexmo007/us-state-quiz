import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import * as results from './result';
import './Game.css';
import { nextQuestion, giveUp, answer } from './store/actions';
import { chooseInput } from './components/input';
import { rating, question } from './prop-types';

class Game extends React.Component {
  render() {
    const QuizInput = chooseInput(this.props.question);
    return (
      <React.Fragment>
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
              <SwitchTransition>
                <CSSTransition
                  key={this.props.rating.result || 'none'}
                  addEndListener={(node, done) =>
                    node.addEventListener('transitionend', done, false)
                  }
                  classNames="result-msg"
                >
                  <div className="d-flex-v justify-center align-center">
                    {this.renderResult(QuizInput)}
                  </div>
                </CSSTransition>
              </SwitchTransition>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </React.Fragment>
    );
  }

  renderResult(input) {
    const rating = this.props.rating;
    if (!rating.result) {
      const NoResult = results.none;
      return <NoResult giveUp={this.props.giveUp} />;
    }
    const Result = rating.component;
    return (
      <Result
        question={this.props.question}
        rating={rating}
        giveUp={this.props.giveUp}
        nextQuestion={this.props.nextQuestion}
        narrow={input.narrowResult}
      />
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
