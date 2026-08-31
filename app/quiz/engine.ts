import levenshtein from 'js-levenshtein';
import type { GameState } from '../store';
import type { Question, Rating, ResultType, State } from '../types';
import { pick } from '../util/rng';
import questions from './questions';
import { results } from './results';
import states from './states';

export function getRandomState() {
  return pick(states);
}

const allCategories = questions.map(({ category }) => category);

export function getRandomQuestion(
  categories = allCategories,
  previousUSState?: State
): Question {
  const state = getRandomState();
  if (previousUSState && previousUSState.name === state.name) {
    return getRandomQuestion(categories, previousUSState);
  }
  const category = pick(categories);
  const question = questions.find((q) => q.category === category);
  if (!question) {
    throw new Error('invalid question category: ' + category);
  }
  const { getMessage, ...questionData } = question;
  return {
    ...questionData,
    id: Math.random(),
    inputType: question.inputType || 'TEXT',
    state,
    message: getMessage(state),
    correctAnswer: state[question.answerField],
  };
}

export function getResult(
  state: GameState,
  result: ResultType,
  attrs = {}
): Rating {
  const { question, rating } = state;
  const { emojis, messages, component } = results.find(
    ({ result: r, inputType }) =>
      result === r && (!inputType || inputType === question.inputType)
  )!;
  return {
    ...attrs,
    result,
    resolved: result === 'correct' || result === 'gave_up',
    incorrect: result === 'wrong' || result === 'almost',
    emoji: rating?.result === result ? rating.emoji : pick(emojis),
    message: rating?.result === result ? rating.message : pick(messages),
    component,
  };
}

export function giveUp(state: GameState) {
  return getResult(state, 'gave_up');
}

export function rate(state: GameState, answer: string) {
  const { question } = state;
  const { answerField, correctAnswer } = question;
  if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
    return getResult(state, 'correct');
  }
  if (answerField !== 'abbreviation') {
    const distance = levenshtein(
      answer.trim().toLowerCase(),
      correctAnswer.toLowerCase()
    );
    if (distance < 3) {
      return getResult(state, 'almost', { distance });
    }
  }
  return getResult(state, 'wrong');
}
