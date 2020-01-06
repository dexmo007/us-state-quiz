import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Streak from './components/Streak';
import { Quiz, questions } from './quiz';
import * as results from './result';
import { TextInput, inputs } from './components/input';
import GearCorner from './components/GearCorner';
import { initAllChecked, getChecked } from './components/CheckboxGroup';
import GameSettings from './GameSettings';
import './Game.css';

class Game extends React.Component {
  state = {
    question: null,
    answer: '',
    rating: {}, // absent, correct or wrong
    streak: 0,
    configModalOpen: false,
    questionTypes: initAllChecked(Object.keys(questions)),
  };

  constructor(props) {
    super(props);
    this.quiz = new Quiz();
    this.state.question = this.quiz.nextQuestion(
      getChecked(this.state.questionTypes)
    );
  }

  nextQuestion = () => {
    this.setState((state) => ({
      answer: '',
      question: this.quiz.nextQuestion(getChecked(state.questionTypes)),
    }));
  };

  onSubmit = (answer) => {
    if (!answer) {
      return;
    }
    if (this.state.rating.result === 'correct') {
      this.nextQuestion();
      return;
    }
    const rating = this.quiz.rate(answer);
    if (rating.result === 'correct') {
      this.setState((state) => ({
        rating,
        answer: rating.correctAnswer,
        streak: state.streak + 1,
      }));
    } else {
      this.setState({ rating, streak: 0, answer });
    }
  };

  giveUp = () => {
    this.setState({
      rating: this.quiz.giveUp(),
      streak: 0,
    });
  };

  render() {
    const QuizInput = !this.state.question.type
      ? TextInput
      : inputs[this.state.question.type];
    return (
      <React.Fragment>
        <GearCorner onClick={() => this.setState({ configModalOpen: true })} />
        <Streak value={this.state.streak} />
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
                width: QuizInput.fullWidth ? '100vw' : null,
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
        <GameSettings
          isOpen={this.state.configModalOpen}
          questionTypes={this.state.questionTypes}
          onQuestionTypesChanged={(questionTypes) =>
            this.setState({ questionTypes })
          }
          onClose={() => {
            this.setState({
              configModalOpen: false,
            });
            if (!this.state.questionTypes[this.state.question.questionType]) {
              this.nextQuestion();
            }
          }}
        />
      </React.Fragment>
    );
  }

  renderResult() {
    const rating = this.state.rating;
    if (!rating.result) {
      const NoResult = results.none;
      return <NoResult giveUp={this.giveUp} />;
    }
    let Result;
    if (rating.result === 'gave_up' && this.state.question.type === 'MAP') {
      Result = results.gave_up_map;
    } else {
      Result = results[rating.result];
    }
    return (
      <Result
        rating={rating}
        giveUp={this.giveUp}
        nextQuestion={this.nextQuestion}
        narrow={this.state.question.type === 'MAP_TEXT'}
      />
    );
  }
}

export default Game;
