import { correct, gave_up, gave_up_map, almost, wrong } from '../result';

export default [
  {
    result: 'correct',
    emojis: ['🎉', '👍', '👌', '👏'],
    messages: ['That is correct!', 'Duh!', 'Alright!', 'Absolutely!'],
    component: correct,
  },
  {
    result: 'gave_up',
    inputType: 'MAP',
    emojis: ['🧐'],
    messages: ['Look at the map!', 'The map reveals the answer!'],
    component: gave_up_map,
  },
  {
    result: 'gave_up',
    emojis: ['🧐'],
    messages: ["The correct answer would've been:"],
    component: gave_up,
  },
  {
    result: 'almost',
    emojis: ['❌', '🤔', '🤨'],
    messages: ['So close!', 'Almost!', 'Uh - close!', 'You just missed it!'],
    component: almost,
  },
  {
    result: 'wrong',
    emojis: ['❌', '🤬', '🤮', '🤦‍♂️', '🤦‍♀️', '💩'],
    messages: [
      'Sorry, incorrect!',
      'Nah!',
      'Hell no!',
      'Negative!',
      'No way!',
      'Yeah, no!',
    ],
    component: wrong,
  },
];
