export default {
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
