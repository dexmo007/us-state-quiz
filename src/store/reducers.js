import { getRandomQuestion } from '../quiz/engine';
import { questions } from '../quiz';

function questionCategories(state, action) {
  switch (action.type) {
    case 'SET_QUESTION_CATEGORY':
      return {
        ...state,
        questionCategories: action.questionCategories,
      };
    default:
      return state;
  }
}
const initialState = {
  streak: 0,
  rating: {},
  question: getRandomQuestion(),
  questionCategories: questions.reduce(
    (questionCategories, { category }) => ({
      ...questionCategories,
      [category]: true,
    }),
    {}
  ),
};

function app(state = initialState, action) {
  switch (action.type) {
    case 'SET_QUESTION_CATEGORY':
      return questionCategories(state, action);
    case 'NEXT_QUESTION':
      return {
        ...state,
        rating: {},
        question: action.question,
      };
    case 'GIVE_UP':
      return {
        ...state,
        streak: 0,
        rating: action.rating,
      };
    case 'ANSWER':
      return {
        ...state,
        streak: action.rating.incorrect ? 0 : state.streak + 1,
        rating: action.rating,
      };
    default:
      return state;
  }
}

export default app;
