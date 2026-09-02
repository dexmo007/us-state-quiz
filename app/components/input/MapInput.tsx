import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import USMap from '~/components/us-map';
import './index.css';
import type InputProps from './props';

const startingPoints = {
  ArrowLeft: 'VA',
  ArrowUp: 'TX',
  ArrowRight: 'CA',
  ArrowDown: 'ND',
};
const navigationMap = {
  WA: ['ME', 'AK', 'ID', 'OR'],
  ID: ['WA', 'AK', 'MT', 'NV'],
  MT: ['ID', 'HI', 'ND', 'WY'],
  ND: ['MT', 'TX', 'MN', 'SD'],
  MN: ['ND', 'LA', 'WI', 'IA'],
  WI: ['MN', 'MI', 'MI', 'IL'],
  MI: ['WI', 'AL', 'NY', 'IN'],
  NY: ['MI', 'FL', 'VT', 'PA'],
  VT: ['NY', 'FL', 'NH', 'MA'],
  NH: ['VT', 'ME', 'ME', 'MA'],
  ME: ['NH', 'FL', 'WA', 'NH'],
  OR: ['MA', 'WA', 'ID', 'CA'],
  WY: ['ID', 'MT', 'SD', 'CO'],
  SD: ['WY', 'ND', 'MN', 'NE'],
  NE: ['WY', 'SD', 'IA', 'KS'],
  IA: ['NE', 'MN', 'IL', 'MO'],
  IL: ['IA', 'WI', 'IN', 'MO'],
  IN: ['IL', 'MI', 'OH', 'KY'],
  OH: ['IN', 'MI', 'PA', 'KY'],
  PA: ['OH', 'NY', 'NJ', 'WV'],
  NJ: ['PA', 'NY', 'CA', 'DE'],
  CT: ['NY', 'MA', 'RI', 'NY'],
  MA: ['NY', 'NH', 'OR', 'CT'],
  RI: ['CT', 'MA', 'MA', 'CT'],
  CA: ['VA', 'OR', 'NV', 'AK'],
  NV: ['CA', 'OR', 'UT', 'CA'],
  UT: ['NV', 'ID', 'CO', 'AZ'],
  CO: ['UT', 'WY', 'KS', 'NM'],
  KS: ['CO', 'NE', 'MO', 'OK'],
  MO: ['KS', 'IA', 'IL', 'AR'],
  KY: ['MO', 'IN', 'WV', 'TN'],
  WV: ['KY', 'PA', 'VA', 'VA'],
  VA: ['WV', 'MD', 'CA', 'NC'],
  MD: ['WV', 'PA', 'DE', 'VA'],
  DE: ['MD', 'NJ', 'NJ', 'MD'],
  AZ: ['CA', 'UT', 'NM', 'AK'],
  NM: ['AZ', 'CO', 'TX', 'HI'],
  TX: ['NM', 'OK', 'LA', 'HI'],
  OK: ['NM', 'KS', 'AR', 'TX'],
  AR: ['OK', 'MO', 'TN', 'LA'],
  TN: ['AR', 'KY', 'NC', 'AL'],
  NC: ['TN', 'VA', 'CA', 'SC'],
  LA: ['TX', 'AR', 'MS', 'MN'],
  MS: ['LA', 'TN', 'AL', 'MI'],
  AL: ['MS', 'TN', 'GA', 'MI'],
  GA: ['AL', 'NC', 'SC', 'FL'],
  SC: ['GA', 'NC', 'CA', 'GA'],
  AK: ['FL', 'CA', 'HI', 'WA'],
  HI: ['AK', 'NM', 'TX', 'MT'],
  FL: ['AL', 'GA', 'AK', 'NY'],
} as Record<string, [string, string, string, string]>;
const keyIndices = {
  ArrowLeft: 0,
  ArrowUp: 1,
  ArrowRight: 2,
  ArrowDown: 3,
};
function isArrowKey(code: string): code is keyof typeof keyIndices {
  return code in keyIndices;
}

function MapInput({ onSubmit, question, rating }: InputProps) {
  const [activeState, setActiveState] = useState<string>();
  const onKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.shiftKey) {
        return;
      }
      const keyCode = e.code;
      if (keyCode === 'Enter') {
        if (activeState) onSubmit(activeState);
        return;
      }
      if (!isArrowKey(keyCode)) {
        return;
      }
      setActiveState((a) =>
        !a ? startingPoints[keyCode] : navigationMap[a][keyIndices[keyCode]]
      );
    },
    [onSubmit, activeState]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyPress);
    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
  }, [onKeyPress]);
  return (
    <>
      <span className="question">{question.message}</span>
      <USMap
        key={Math.random()}
        className={classNames('answer', rating?.result)}
        style={{ height: 'auto' }}
        readOnly={rating?.resolved}
        highlight={rating?.resolved ? question.correctAnswer : undefined}
        active={activeState}
        onClick={(e) => {
          const state = e.currentTarget.dataset.name;
          if (state) onSubmit(state);
        }}
      ></USMap>
    </>
  );
}
MapInput.fullWidth = true;
export default MapInput;
