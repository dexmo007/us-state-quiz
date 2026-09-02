import { Almost, Correct, GaveUp, GaveUpMap, Wrong } from '~/result';
import type ResultProps from '~/result/props';

const resultSpecs = [
  {
    result: 'correct',
    emojis: ['🎉', '👍', '👌', '👏'],
    messages: ['That is correct!', 'Duh!', 'Alright!', 'Absolutely!'],
    component: { Correct },
  },
  {
    result: 'gave_up',
    inputType: 'MAP',
    emojis: ['🧐'],
    messages: ['Look at the map!', 'The map reveals the answer!'],
    component: { GaveUpMap },
  },
  {
    result: 'gave_up',
    emojis: ['🧐'],
    messages: ["The correct answer would've been:"],
    component: { GaveUp },
  },
  {
    result: 'almost',
    emojis: ['❌', '🤔', '🤨'],
    messages: ['So close!', 'Almost!', 'Uh - close!', 'You just missed it!'],
    component: { Almost },
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
    component: { Wrong },
  },
];

export type ResultComponentName =
  keyof (typeof resultSpecs)[number]['component'];

export const resultComponentMap = resultSpecs.reduceRight(
  (map, r) => ({
    ...map,
    ...r.component,
  }),
  {}
) as Record<ResultComponentName, React.FC<ResultProps>>;

export const results = resultSpecs.map((r) => ({
  ...r,
  component: Object.keys(r.component)[0] as ResultComponentName,
}));
