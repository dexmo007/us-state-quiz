import * as correct from './correct';
import * as almost from './almost';
import * as wrong from './wrong';
import * as gave_up from './gave_up';
import * as gave_up_map from './gave_up_map';

export { default as correct } from './correct';
export { default as gave_up } from './gave_up';
export { default as wrong } from './wrong';
export { default as almost } from './almost';
export { default as none } from './none';
export { default as gave_up_map } from './gave_up_map';

export const pools = {
  correct,
  almost,
  wrong,
  gave_up,
  gave_up_map,
};
