import PropTypes from 'prop-types';
import { question, rating } from '../../prop-types';

export default {
  onSubmit: PropTypes.func.isRequired,
  rating: rating.isRequired,
  question: question.isRequired,
};
