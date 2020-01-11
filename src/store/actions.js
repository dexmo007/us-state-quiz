import * as quiz from '../quiz/engine';

export function nextQuestion() {
  return (dispatch, getState) =>
    dispatch({
      type: 'NEXT_QUESTION',
      question: quiz.getRandomQuestion(
        Object.entries(getState().questionCategories)
          .filter(([, checked]) => checked)
          .map(([category]) => category),
        getState().question.state
      ),
    });
}

export function answer(answer) {
  return (dispatch, getState) => {
    if (getState().rating.resolved) {
      dispatch(nextQuestion());
      return;
    }
    dispatch({
      type: 'ANSWER',
      rating: quiz.rate(getState(), answer),
    });
  };
}

export function giveUp() {
  return (dispatch, getState) =>
    dispatch({
      type: 'GIVE_UP',
      rating: quiz.giveUp(getState()),
    });
}

export function setQuestionCategories(questionCategories) {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_QUESTION_CATEGORY',
      questionCategories,
    });
    const { question } = getState();
    if (!questionCategories[question.category]) {
      dispatch(nextQuestion());
    }
  };
}
