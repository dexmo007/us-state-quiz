import React from 'react';
import classNames from 'classnames';
import * as quiz from './quiz';
import './App.css';

class App extends React.Component {
  state = {
    question: quiz.nextQuestion(),
    answer: '',
    lastRating: {},
    rating: {}, // absent, correct or wrong
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    // This binding is necessary to make `this` work in the callback
    this.onSubmit = this.onSubmit.bind(this);
  }

  nextQuestion = () => {
    this.setState((state) => ({
      answer: '',
      question: quiz.nextQuestion(),
      lastRating: state.rating,
      rating: {},
    }));
  };

  onSubmit(event) {
    event.preventDefault();
    if (!this.state.answer) {
      return;
    }
    if (this.state.rating.result === 'correct') {
      this.nextQuestion();
      return;
    }
    const rating = quiz.rate(this.state.question, this.state.answer);

    if (rating.result === 'wrong' && this.state.rating.result === 'wrong') {
      // retrigger animation if still wrong
      const el = this.inputRef.current;
      el.style.animation = 'none';
      void el.offsetHeight; /* trigger reflow */
      el.style.animation = null;
    }

    this.setState({ rating });
  }

  giveUp = () => {
    this.setState((state) => ({
      rating: { ...state.rating, result: 'gave_up' },
    }));
  };

  onChange = (event) => {
    this.setState({ answer: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <span className="question">{this.state.question.message}</span>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.answer}
            onChange={this.onChange}
            className={classNames('answer', {
              wrong: this.state.rating.result === 'wrong',
            })}
            ref={this.inputRef}
            spellCheck="false"
          />
        </form>
        <div
          className={classNames('hideable', {
            hidden: !this.state.rating.result,
          })}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {this.renderResult()}
        </div>
      </div>
    );
  }

  renderResult() {
    if (!this.state.rating.result) {
      return this.renderResultExplicit(this.state.lastRating);
    }
    return this.renderResultExplicit(this.state.rating);
  }

  renderResultExplicit(rating) {
    if (rating.result === 'correct') {
      return (
        <React.Fragment>
          <div className="message">
            <span role="img" aria-label="Congratulations">
              🎉
            </span>
            <span>That is correct!</span>
          </div>
          <button onClick={this.nextQuestion}>
            <span>Next Question</span>
            <span className="rocket" role="img" aria-label="Go">
              🚀
            </span>
          </button>
        </React.Fragment>
      );
    }
    if (rating.result === 'wrong') {
      return (
        <React.Fragment>
          <div className="message">
            <span role="img" aria-label="Incorrect">
              ❌
            </span>
            <span>Sorry, incorrect!</span>
          </div>
          <button onClick={this.giveUp}>
            <span>Give up</span>
            <span role="img" aria-label="crying out loud">
              😩
            </span>
          </button>
        </React.Fragment>
      );
    }
    if (rating.result === 'gave_up') {
      return (
        <React.Fragment>
          <div className="message">
            <span role="img" aria-label="Incorrect">
              🧐
            </span>
            <span>The correct answer would've been:</span>
          </div>
          <span className="text" style={{ textDecoration: 'underline' }}>
            {rating.correctAnswer}
          </span>
          <button onClick={this.nextQuestion}>
            <span>Next Question</span>
            <span className="rocket" role="img" aria-label="Go">
              🚀
            </span>
          </button>
        </React.Fragment>
      );
    }
  }
}

export default App;
