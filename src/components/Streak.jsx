import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlipNumbers from 'react-flip-numbers';
import './Streak.css';

function vmin() {
  return (
    (window.innerHeight < window.innerWidth
      ? window.innerHeight
      : window.innerWidth) / 100
  );
}

class Streak extends React.Component {
  state = {
    vmin: vmin(),
  };

  onResize = () => {
    this.setState({ vmin: vmin() });
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    return (
      <div className="Streak">
        <span style={{ fontSize: '.7em' }}>Streak</span>
        <FlipNumbers
          play
          color="#fff"
          background="#282c34"
          width={10 + 3 * this.state.vmin}
          height={10 + 3 * this.state.vmin}
          delay={0.175}
          duration={0.175}
          numbers={`${this.props.value}`}
        />
      </div>
    );
  }
}

Streak.propTypes = {
  value: PropTypes.number.isRequired,
};

export default connect(({ streak }) => ({ value: streak }))(Streak);
