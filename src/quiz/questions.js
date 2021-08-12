const questions = [
  {
    category: 'abbreviation2State',
    displayName: 'Abbreviation → State',
    description: 'Name the state for a given abbreviation.',
    answerField: 'name',
    getMessage: (state) =>
      `What state has the abbreviation ${state.abbreviation}?`,
  },
  {
    category: 'state2Abbreviation',
    displayName: 'State → Abbreviation',
    description: 'Name the abbrevation for a given state.',
    answerField: 'abbreviation',
    getMessage: (state) => `What's the abbreviation of ${state.name}?`,
  },
  {
    category: 'capital',
    displayName: 'Capital',
    description: 'Name the capital of the given state.',
    answerField: 'capital',
    getMessage: (state) => `What's the capital of ${state.name}?`,
  },
  {
    category: 'biggestCity',
    displayName: 'Biggest city',
    description: 'Name the biggest city of a given state.',
    answerField: 'biggestCity',
    getMessage: (state) => `What's the biggest city of ${state.name}?`,
  },
  {
    category: 'stateLocation',
    displayName: 'State location',
    description: 'Locate the given state on the map.',
    answerField: 'abbreviation',
    inputType: 'MAP',
    getMessage: (state) => `Where is ${state.name}?`,
  },
  {
    category: 'identifyStateOnMap',
    displayName: 'Identify state on map',
    description: 'Identify a marked state on the map.',
    answerField: 'name',
    inputType: 'MAP_TEXT',
    getMessage: () => 'Which state is shown?',
  },
];

export default questions;
