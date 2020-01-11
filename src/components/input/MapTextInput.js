import React from 'react';
import propTypes from './propTypes';
import USMap from '../us-map';
import TextField from './TextField';
import './index.css';

class MapTextInput extends React.Component {
  render() {
    return (
      <React.Fragment>
        <span className="question">{this.props.question.message}</span>
        <USMap
          style={{ height: 'auto' }}
          readOnly={true}
          highlight={this.props.question.state.abbreviation}
        ></USMap>
        <TextField
          question={this.props.question}
          rating={this.props.rating}
          onSubmit={this.props.onSubmit}
          inputStyle={{
            margin: '1em',
            marginBottom: '0',
            padding: '0.5em',
          }}
        />
      </React.Fragment>
    );
  }
}

MapTextInput.propTypes = propTypes;
MapTextInput.fullWidth = true;
MapTextInput.narrowResult = true;
export default MapTextInput;
