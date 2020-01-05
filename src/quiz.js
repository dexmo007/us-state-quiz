import levenshtein from 'js-levenshtein';
import data from './states.json';
import questions from './questions';
import { pick } from './util';
import { pools } from './result';

const states = data.map((state) => ({
  ...state,
  biggestCity: state.biggestCity || state.capital,
}));

export default class Quiz {
  _lastPickedState;
  _question;
  _previousRating;

  nextQuestion(questionTypes) {
    this._previousRating = null;
    const state = pick(states);
    if (this._lastPickedState === state.name) {
      return this.nextQuestion();
    }
    this._lastPickedState = state.name;
    const questionType = pick(questionTypes || Object.keys(questions));
    const { message, answerField, type } = questions[questionType].generate(
      state
    );
    this._question = {
      type,
      questionType,
      state,
      message,
      answerField,
      id: (Math.random() * 1000000).toFixed(0),
    };
    return this._question;
  }

  rate(answer) {
    const rating = this.createRating(this._rate(answer));
    this._previousRating = rating;
    return rating;
  }

  giveUp() {
    const rating = this.createRating({
      result: 'gave_up',
      correctAnswer: this._question.state[this._question.answerField],
      message: pick(
        pools[this._question.type === 'MAP' ? 'gave_up_map' : 'gave_up']
          .messages
      ),
      emoji: pick(pools.gave_up.emojis),
    });
    this._previousRating = rating;
    return rating;
  }

  _rate(answer) {
    const { state, answerField } = this._question;
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

  createRating(rating) {
    if (this._previousRating && rating.result === this._previousRating.result) {
      rating.emoji = this._previousRating.emoji;
      rating.message = this._previousRating.message;
    } else {
      rating.message = pick(pools[rating.result].messages);
      rating.emoji = pick(pools[rating.result].emojis);
    }

    return rating;
  }
}
