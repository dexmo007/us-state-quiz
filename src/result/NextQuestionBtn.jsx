import React from 'react';
import PropTypes from 'prop-types'

const NextQuestionBtn = (props) => (
  <button className="fit-content" onClick={props.nextQuestion}>
    <span>Next Question</span>
    <span className="rocket" role="img" aria-label="Go">
      🚀
    </span>
  </button>
);

NextQuestionBtn.propTypes = {
  nextQuestion: PropTypes.func.isRequired
}

export default NextQuestionBtn;
