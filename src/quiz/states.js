import data from './states.json';

export default data.map((state) => ({
  ...state,
  biggestCity: state.biggestCity || state.capital,
}));
