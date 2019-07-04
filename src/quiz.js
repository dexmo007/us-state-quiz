import data from './states.json';

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

function pick(arr) {
  const i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

export function nextQuestion() {
  const state = pick(states);
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

export function rate({ state, answerField }, answer) {
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
  return {
    result: 'wrong',
    correctAnswer,
  };
}
