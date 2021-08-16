import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.css';
import './TextField.css';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      key: Math.random(),
    };
    this.inputRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.rating.incorrect && prevProps.rating !== this.props.rating) {
      this.setState(
        {
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
        onSubmit={(e) => {
          e.preventDefault();
          if (this.state.value) {
            this.props.onSubmit(this.state.value);
          }
        }}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        style={this.props.style}
      >
        <input
          type="text"
          key={this.state.key}
          value={
            this.props.rating.result === 'correct'
              ? this.props.question.correctAnswer
              : this.state.value
          }
          onChange={(e) => this.setState({ value: e.target.value })}
          className={classNames('answer', this.props.rating.result)}
          ref={this.inputRef}
          spellCheck="false"
          autoComplete="off"
          autoCorrect="off"
          readOnly={this.props.rating.resolved}
          style={this.props.inputStyle}
        />
      </form>
    );
  }
}

TextField.propTypes = {
  onSubmit: PropTypes.func,
  question: PropTypes.object.isRequired,
  rating: PropTypes.object.isRequired,
  inputStyle: PropTypes.object,
};

export default TextField;
