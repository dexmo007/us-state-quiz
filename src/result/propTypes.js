import PropTypes from 'prop-types';
import { rating, question } from '../prop-types';

export default {
  question: question.isRequired,
  rating: rating.isRequired,
  giveUp: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  quizInput: PropTypes.func.isRequired,
};
