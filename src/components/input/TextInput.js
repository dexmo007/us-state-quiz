import React from 'react';
import propTypes from './propTypes';
import classNames from 'classnames';
import './index.css';
import './TextInput.css';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      key: Math.random(),
    };
    this.inputRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState(
        {
          value: this.props.value,
          key: Math.random(),
        },
        () => this.inputRef.current.focus()
      );
    }
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <form
        className="d-flex-v justify-center align-center"
        onSubmit={(e) => {
          e.preventDefault();
          this.props.onSubmit(this.state.value);
        }}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      >
        <span className="question">{this.props.question.message}</span>
        <input
          type="text"
          key={this.state.key}
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
          className={classNames('answer', this.props.rating.result)}
          ref={this.inputRef}
          spellCheck="false"
          autoComplete="off"
          autoCorrect="off"
          readOnly={
            this.props.rating.result === 'correct' ||
            this.props.rating.result === 'gave_up'
          }
        />
      </form>
    );
  }
}

TextInput.propTypes = propTypes;

export default TextInput;
