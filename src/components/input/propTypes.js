import PropTypes from 'prop-types';
export default {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string,
  rating: PropTypes.shape({
    result: PropTypes.string,
  }).isRequired,
  question: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string,
  }).isRequired,
};
