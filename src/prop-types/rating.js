import PropTypes from 'prop-types';

export default PropTypes.shape({
  result: PropTypes.oneOf(['correct', 'gave_up', 'almost', 'wrong']),
  resolved: PropTypes.bool,
  incorrect: PropTypes.bool,
  emoji: PropTypes.string,
  message: PropTypes.string,
  component: PropTypes.func,
  distance: PropTypes.bool,
});
