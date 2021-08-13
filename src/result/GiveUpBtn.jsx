import React from 'react';
import PropTypes from 'prop-types';

const GiveUpBtn = (props) => (
  <button className="fit-content" onClick={props.giveUp}>
    <span>Give up</span>
    <span role="img" aria-label="crying out loud">
      😩
    </span>
  </button>
);
GiveUpBtn.propTypes = {
  giveUp: PropTypes.func.isRequired,
};

export default GiveUpBtn;
