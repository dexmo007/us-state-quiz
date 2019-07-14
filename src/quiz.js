import levenshtein from 'js-levenshtein';
import data from './states.json';
import questions from './questions';
import { pick } from './util';

const states = data.map((state) => ({
  ...state,
  biggestCity: state.biggestCity || state.capitol,
}));

export default class Quiz {
  _lastPickedState;

  nextQuestion() {
    const state = pick(states);
    if (this._lastPickedState === state.name) {
      return this.nextQuestion();
    }
    this._lastPickedState = state.name;
    const { message, answerField } = questions[pick(Object.keys(questions))](
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
