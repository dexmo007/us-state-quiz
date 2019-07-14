import levenshtein from 'js-levenshtein';
import data from './states.json';
import { pick } from './util';

const states = data
  .filter((s) => !s.territory)
  .map((s) => ({ ...s, biggestCity: s.biggestCity || s.capitol }));

const templates = {
  abbreviation2State: (state) => ({
    message: `What state has the abbreviation ${state.abbreviation}?`,
    answerField: 'name',
  }),
  state2Abbreviation: (state) => ({
    message: `What's the abbreviation of ${state.name}?`,
    answerField: 'abbreviation',
  }),
  capitol: (state) => ({
    message: `What's the capitol of ${state.name}?`,
    answerField: 'capitol',
  }),
  biggestCity: (state) => ({
    message: `What's the biggest city of ${state.name}?`,
    answerField: 'biggestCity',
  }),
};

export default class Quiz {
  _lastPickedState;

  nextQuestion() {
    const state = pick(states);
    if (this._lastPickedState === state.name) {
      return this.nextQuestion();
    }
    this._lastPickedState = state.name;
    const { message, answerField } = templates[pick(Object.keys(templates))](
      state
    );
    return {
      state,
      message,
      answerField,
      id: (Math.random() * 1000000).toFixed(0),
    };
  }

  rate({ state, answerField }, answer) {
    const correctAnswer = state[answerField];
    if (!answer) {
      return {
        result: 'unrated',
        correctAnswer,
      };
    }
    if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      return {
        result: 'correct',
        correctAnswer,
      };
    }
    if (answerField !== 'abbreviation') {
      const distance = levenshtein(
        answer.trim().toLowerCase(),
        correctAnswer.toLowerCase()
      );
      if (distance < 3) {
        return {
          result: 'almost',
          distance,
          correctAnswer,
        };
      }
    }
    return {
      result: 'wrong',
      correctAnswer,
    };
  }
}
