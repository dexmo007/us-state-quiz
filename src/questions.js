export default {
  abbreviation2State: {
    displayName: 'Abbreviation → State',
    description: 'Name the state for a given abbreviation.',
    generate: (state) => ({
      message: `What state has the abbreviation ${state.abbreviation}?`,
      answerField: 'name',
    }),
  },
  state2Abbreviation: {
    displayName: 'State → Abbreviation',
    description: 'Name the abbrevation for a given state.',
    generate: (state) => ({
      message: `What's the abbreviation of ${state.name}?`,
      answerField: 'abbreviation',
    }),
  },
  capital: {
    displayName: 'Capital',
    description: 'Name the capital of the given state.',
    generate: (state) => ({
      message: `What's the capital of ${state.name}?`,
      answerField: 'capital',
    }),
  },
  biggestCity: {
    displayName: 'Biggest city',
    description: 'Name the biggest city of a given state.',
    generate: (state) => ({
      message: `What's the biggest city of ${state.name}?`,
      answerField: 'biggestCity',
    }),
  },
  stateLocation: {
    displayName: 'State location',
    description: 'Locate the given state on the map.',
    generate: (state) => ({
      message: `Where is ${state.name}?`,
      answerField: 'abbreviation',
      type: 'MAP',
    }),
  },
};
