import PropTypes from 'prop-types';
import { rating, question } from '../prop-types';

const resultPropTypes = {
  question: question.isRequired,
  rating: rating.isRequired,
  giveUp: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  quizInput: PropTypes.func.isRequired,
};

export default resultPropTypes;
