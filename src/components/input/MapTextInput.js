import React from 'react';
import classNames from 'classnames';
import propTypes from './propTypes';
import USMap from '../us-map';
import './index.css';

class MapTextInput extends React.Component {
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
      <React.Fragment>
        <span className="question">{this.props.question.message}</span>
        <USMap
          style={{ height: 'auto' }}
          readOnly={true}
          highlight={this.props.question.state.abbreviation}
        ></USMap>
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
            style={{
              margin: '1em',
              marginBottom: '0',
              padding: '0.5em',
            }}
          />
        </form>
      </React.Fragment>
    );
  }
}

MapTextInput.propTypes = propTypes;
MapTextInput.fullWidth = true;
export default MapTextInput;
