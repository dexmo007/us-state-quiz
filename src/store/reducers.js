import { getRandomQuestion } from '../quiz/engine';
import { questions } from '../quiz';

function questionCategories(state, action) {
  switch (action.type) {
    case 'SET_QUESTION_CATEGORY':
      return {
        ...state,
        streak: 0,
        questionCategories: action.questionCategories,
      };
    default:
      return state;
  }
}
let filterCategories = () => true;
const defaultCategories = process.env.REACT_APP_DEFAULT_QUESTION_CATEGORIES;
if (defaultCategories && defaultCategories.trim()) {
  const categories = process.env.REACT_APP_DEFAULT_QUESTION_CATEGORIES.split(
    ','
  ).map((s) => s.trim());
  filterCategories = (c) => categories.includes(c);
}
const initialCategories = questions.reduce(
  (questionCategories, { category }) => ({
    ...questionCategories,
    [category]: filterCategories(category),
  }),
  {}
);
const initialState = {
  streak: 0,
  rating: {},
  question: getRandomQuestion(
    questions
      .filter((q) => initialCategories[q.category])
      .map(({ category }) => category)
  ),
  questionCategories: initialCategories,
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
