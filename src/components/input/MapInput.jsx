import React, { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import propTypes from './propTypes';
import USMap from '../us-map';
import './index.css';

const KEY_CODE_ENTER = 13;
const keyMap = {
  37: 'LEFT',
  38: 'UP',
  39: 'RIGHT',
  40: 'DOWN',
};
const startingPoints = {
  LEFT: 'VA',
  UP: 'TX',
  RIGHT: 'CA',
  DOWN: 'ND',
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
};
const keyIndices = {
  LEFT: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
};

function MapInput({ onSubmit, question, rating }) {
  const [activeState, setActiveState] = useState(null);
  const onKeyPress = useCallback(
    (e) => {
      if (e.ctrlKey || e.altKey || e.shiftKey) {
        return;
      }
      const keyCode = 'which' in e ? e.which : e.keyCode;
      if (keyCode === KEY_CODE_ENTER && activeState !== null) {
        onSubmit(activeState);
        return;
      }
      if (!(keyCode in keyMap)) {
        return;
      }
      const key = keyMap[keyCode];
      setActiveState((a) =>
        a === null ? startingPoints[key] : navigationMap[a][keyIndices[key]]
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
        className={classNames('answer', rating.result)}
        style={{ height: 'auto' }}
        readOnly={rating.resolved}
        highlight={rating.resolved ? question.correctAnswer : null}
        active={activeState}
        onClick={(e) => {
          onSubmit(e.target.dataset.name);
        }}
      ></USMap>
    </>
  );
}
MapInput.propTypes = propTypes;
MapInput.fullWidth = true;
export default MapInput;
