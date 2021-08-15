import React from 'react';
import propTypes from './propTypes';
import TextField from './TextField';
import './index.css';

class TextInput extends React.Component {
  render() {
    return (
      <div className="d-flex-v justify-center align-center">
        <span className="question">{this.props.question.message}</span>
        <TextField
          question={this.props.question}
          rating={this.props.rating}
          onSubmit={this.props.onSubmit}
        />
      </div>
    );
  }
}

TextInput.propTypes = propTypes;

export default TextInput;
