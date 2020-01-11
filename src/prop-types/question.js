import PropTypes from 'prop-types';

export default PropTypes.shape({
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    abbreviation: PropTypes.string.isRequired,
    capital: PropTypes.string.isRequired,
    biggestCity: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  inputType: PropTypes.oneOf(['TEXT', 'MAP', 'MAP_TEXT']).isRequired,
  message: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  answerField: PropTypes.oneOf([
    'name',
    'abbreviation',
    'capital',
    'biggestCity',
  ]).isRequired,
  getMessage: PropTypes.func.isRequired,
});
