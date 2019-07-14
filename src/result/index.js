import * as correct from './correct';
import * as almost from './almost';
import * as wrong from './wrong';
import * as gave_up from './gave_up';

export { default as correct } from './correct';
export { default as gave_up } from './gave_up';
export { default as wrong } from './wrong';
export { default as almost } from './almost';

export const pools = {
  correct,
  almost,
  wrong,
  gave_up,
};
