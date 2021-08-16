import React from 'react';
import propTypes from './propTypes';
import USMap from '../us-map';
import TextField from './TextField';
import './index.css';

class MapTextInput extends React.Component {
  render() {
    return (
      <>
        <span className="question">{this.props.question.message}</span>
        <USMap
          style={{ flex: 1 }}
          readOnly={true}
          highlight={this.props.question.state.abbreviation}
          className="map-input"
        ></USMap>
        <TextField
          question={this.props.question}
          rating={this.props.rating}
          onSubmit={this.props.onSubmit}
          style={{
            margin: '1em',
            marginBottom: '0',
          }}
          inputStyle={{
            padding: '0.5em',
          }}
        />
      </>
    );
  }
}

MapTextInput.propTypes = propTypes;
MapTextInput.fullWidth = true;
MapTextInput.narrowResult = true;
export default MapTextInput;
