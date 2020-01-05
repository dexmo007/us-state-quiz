import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Modal from 'react-modal';
import Streak from './components/Streak';
import Quiz from './quiz';
import * as results from './result';
import './Game.css';
import questions from './questions';
import { pick } from './util';
import { TextInput, MapInput } from './components/input';
import GearCorner from './components/GearCorner';
import Checkbox from './components/Checkbox';

class Game extends React.Component {
  state = {
    question: null,
    answer: '',
    rating: {}, // absent, correct or wrong
    streak: 0,
    configModalOpen: false,
    questionTypes: Object.keys(questions).reduce(
      (types, type) => ({ ...types, [type]: true }),
      {}
    ),
  };

  constructor(props) {
    super(props);
    this.quiz = new Quiz();
    this.state.question = this.quiz.nextQuestion();

    this.onSubmit = this.onSubmit.bind(this);
  }

  nextQuestion = () => {
    this.setState((state) => ({
      answer: '',
      question: this.quiz.nextQuestion(
        Object.entries(state.questionTypes)
          .filter(([, checked]) => checked)
          .map(([type]) => type)
      ),
    }));
  };

  onSubmit(answer) {
    if (!answer) {
      return;
    }
    if (this.state.rating.result === 'correct') {
      this.nextQuestion();
      return;
    }
    const previousRating = this.state.rating;
    const rating = this.quiz.rate(this.state.question, answer);

    if (rating.result === previousRating.result) {
      rating.emoji = previousRating.emoji;
      rating.message = previousRating.message;
    } else {
      rating.message = pick(results.pools[rating.result].messages);
      rating.emoji = pick(results.pools[rating.result].emojis);
    }
    if (rating.result === 'correct') {
      this.setState((state) => ({
        rating,
        answer: rating.correctAnswer,
        streak: state.streak + 1,
      }));
    } else {
      this.setState({ rating, streak: 0, answer });
    }
  }

  giveUp = () => {
    this.setState((state) => ({
      rating: {
        ...state.rating,
        result: 'gave_up',
        message: pick(
          results.pools[
            state.question.type === 'MAP' ? 'gave_up_map' : 'gave_up'
          ].messages
        ),
        emoji: pick(results.pools.gave_up.emojis),
        streak: 0,
      },
    }));
  };

  render() {
    const QuizInput = this.state.question.type === 'MAP' ? MapInput : TextInput;
    return (
      <React.Fragment>
        <Streak value={this.state.streak} />
        <GearCorner onClick={() => this.setState({ configModalOpen: true })} />
        <SwitchTransition>
          <CSSTransition
            key={this.state.question.id}
            addEndListener={(node, done) =>
              node.addEventListener('transitionend', done, false)
            }
            classNames="question-transition"
            onExited={() => this.setState({ rating: {} })}
          >
            <div
              className="main"
              style={{
                width: this.state.question.type === 'MAP' ? '100vw' : null,
              }}
            >
              <QuizInput
                question={this.state.question}
                rating={this.state.rating}
                value={this.state.answer}
                onSubmit={this.onSubmit}
              ></QuizInput>
              <SwitchTransition>
                <CSSTransition
                  key={this.state.rating.result || 'none'}
                  addEndListener={(node, done) =>
                    node.addEventListener('transitionend', done, false)
                  }
                  classNames="result-msg"
                >
                  <div className="d-flex-v justify-center align-center">
                    {this.renderResult()}
                  </div>
                </CSSTransition>
              </SwitchTransition>
            </div>
          </CSSTransition>
        </SwitchTransition>
        <Modal
          isOpen={this.state.configModalOpen}
          onRequestClose={() => this.setState({ configModalOpen: false })}
          style={{
            content: {
              background: '#282c34',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
          closeTimeoutMS={250}
        >
          <h1>What games do you wanna play?</h1>
          <div className="d-flex-v">
            {Object.entries(questions).map(
              ([questionType, { displayName, description }]) => (
                <Checkbox
                  style={{
                    margin: '.3em',
                  }}
                  key={questionType}
                  label={displayName}
                  subtitle={description}
                  checked={this.state.questionTypes[questionType]}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    this.setState((state) => ({
                      questionTypes: {
                        ...state.questionTypes,
                        [questionType]: checked,
                      },
                    }));
                  }}
                />
              )
            )}
          </div>
          <button
            className="fit-content"
            style={{
              marginTop: 'auto',
              alignSelf: 'center',
            }}
            onClick={() =>
              this.setState(
                {
                  configModalOpen: false,
                },
                () => {
                  if (
                    !this.state.questionTypes[this.state.question.questionType]
                  ) {
                    this.nextQuestion();
                  }
                }
              )
            }
          >
            <span>Go!</span>
            <span className="rocket" role="img" aria-label="Go">
              🚀
            </span>
          </button>
        </Modal>
      </React.Fragment>
    );
  }

  renderResult() {
    const rating = this.state.rating;
    if (!rating.result) {
      const NoResult = results.none;
      return <NoResult />;
    }
    if (rating.result === 'gave_up' && this.state.question.type === 'MAP') {
      const Result = results.gave_up_map;
      return (
        <Result
          rating={rating}
          giveUp={this.giveUp}
          nextQuestion={this.nextQuestion}
        />
      );
    }
    const Result = results[rating.result];
    return (
      <Result
        rating={rating}
        giveUp={this.giveUp}
        nextQuestion={this.nextQuestion}
      />
    );
  }
}

export default Game;
