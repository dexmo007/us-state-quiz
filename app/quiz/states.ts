import type { State } from '~/types';
import data from './states.json';

const states: State[] = data.map((state) => ({
  ...state,
  biggestCity: state.biggestCity || state.capital,
}));

export default states;
