import React from 'react';
import classNames from 'classnames';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import * as quiz from './quiz';
import './App.css';

class App extends React.Component {
  state = {
    question: quiz.nextQuestion(),
    answer: '',
    rating: {}, // absent, correct or wrong
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    // This binding is necessary to make `this` work in the callback
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  nextQuestion = () => {
    this.setState({
      answer: '',
      question: quiz.nextQuestion(),
    });
    this.inputRef.current.focus();
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
    if (rating.result === 'correct') {
      this.setState({ rating, answer: rating.correctAnswer });
    } else {
      this.setState({ rating });
    }
  }

  giveUp = () => {
    this.setState((state) => ({
      rating: { ...state.rating, result: 'gave_up' },
    }));
  };

  onChange = (event) => {
    this.setState({ answer: event.target.value });
  };

  isResolved() {
    return (
      this.state.rating.result === 'correct' ||
      this.state.rating.result === 'gave_up'
    );
  }

  render() {
    return (
      <div className="App">
        <h1>
          <span role="img" aria-label="US Flag">
            🇺🇸
          </span>
          US State Quiz
        </h1>
        <SwitchTransition>
          <CSSTransition
            key={this.state.question.id}
            addEndListener={(node, done) =>
              node.addEventListener('transitionend', done, false)
            }
            classNames="question-transition"
            onExited={() => this.setState({ rating: {} })}
            onEntered={() => this.inputRef.current.focus()}
          >
            <div className="container">
              <form onSubmit={this.onSubmit}>
                <span className="question">{this.state.question.message}</span>
                <input
                  value={this.state.answer}
                  onChange={this.onChange}
                  className={classNames('answer', this.state.rating.result)}
                  ref={this.inputRef}
                  spellCheck="false"
                  readOnly={this.isResolved()}
                />
              </form>
              <SwitchTransition>
                <CSSTransition
                  key={this.state.rating.result || 'none'}
                  addEndListener={(node, done) =>
                    node.addEventListener('transitionend', done, false)
                  }
                  classNames="result-msg"
                >
                  <div className="d-flex-v">{this.renderResult()}</div>
                </CSSTransition>
              </SwitchTransition>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    );
  }

  renderResult() {
    const rating = this.state.rating;
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
