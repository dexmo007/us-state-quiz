import PropTypes from 'prop-types';
import { question, rating } from '../../prop-types';

const inputPropTypes = {
  onSubmit: PropTypes.func.isRequired,
  rating: rating.isRequired,
  question: question.isRequired,
};


export default inputPropTypes;
