import React from 'react';
import classNames from 'classnames';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import GithubCorner from 'react-github-corner';
import Quiz from './Quiz';
import * as results from './result';
import './App.css';
import { pick } from './util';
import { ReactComponent as USFlag } from './us.svg';

class App extends React.Component {
  state = {
    question: null,
    answer: '',
    rating: {}, // absent, correct or wrong
  };

  constructor(props) {
    super(props);
    this.quiz = new Quiz();
    this.state.question = this.quiz.nextQuestion();
    this.inputRef = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  nextQuestion = () => {
    this.setState({
      answer: '',
      question: this.quiz.nextQuestion(),
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
    const previousRating = this.state.rating;
    const rating = this.quiz.rate(this.state.question, this.state.answer);

    if (
      (rating.result === 'wrong' && previousRating.result === 'wrong') ||
      (rating.result === 'almost' && previousRating.result === 'almost')
    ) {
      // retrigger animation if still wrong
      const el = this.inputRef.current;
      el.style.animation = 'none';
      void el.offsetHeight; /* trigger reflow */
      el.style.animation = null;
    }
    if (rating.result === previousRating.result) {
      rating.emoji = previousRating.emoji;
      rating.message = previousRating.message;
    } else {
      rating.message = pick(results.pools[rating.result].messages);
      rating.emoji = pick(results.pools[rating.result].emojis);
    }
    if (rating.result === 'correct') {
      this.setState({ rating, answer: rating.correctAnswer });
    } else {
      this.setState({ rating });
    }
  }

  giveUp = () => {
    this.setState((state) => ({
      rating: {
        ...state.rating,
        result: 'gave_up',
        message: pick(results.pools.gave_up.messages),
        emoji: pick(results.pools.gave_up.emojis),
      },
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
        <GithubCorner
          href="https://github.com/dexmo007/us-state-quiz"
          bannerColor="#fff"
          octoColor="#282c34"
        />
        <h1 className="d-flex" style={{ alignItems: 'center' }}>
          <USFlag height="1em" style={{ margin: '.2em' }} />
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
    if (!rating.result) {
      return;
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

export default App;
