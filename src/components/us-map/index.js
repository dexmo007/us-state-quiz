import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ActionBtn from '../ActionBtn';
import { FaUndo } from 'react-icons/fa';
import data from './data.json';
import './USMap.css';

const [, , svgWidth, svgHeight] = [...data.viewBox];

function USMap(props) {
  const [viewBox, setViewBox] = useState(data.viewBox);
  const [panning, setPanning] = useState({ active: false });
  const svg = useRef();

  function onWheel(e) {
    // if (!e.isDefaultPrevented()) {
    //   e.preventDefault();
    // }
    const [x, y, w, h] = viewBox;
    var mx = e.nativeEvent.offsetX;
    var my = e.nativeEvent.offsetY;
    var dw = w * Math.sign(e.nativeEvent.deltaY) * -0.05;
    var dh = h * Math.sign(e.nativeEvent.deltaY) * -0.05;
    var dx = (dw * mx) / svgWidth;
    var dy = (dh * my) / svgHeight;
    const newViewBox = [x + dx, y + dy, w - dw, h - dh];
    setViewBox(newViewBox);
  }
  function onMouseDown(e) {
    setPanning({
      active: true,
      startPoint: { x: e.nativeEvent.x, y: e.nativeEvent.y },
    });
  }
  function onMouseMove(e) {
    if (panning.active) {
      const endPoint = { x: e.nativeEvent.x, y: e.nativeEvent.y };
      const [x, y, w, h] = viewBox;

      var dx =
        (((panning.startPoint.x - endPoint.x) / svg.current.clientWidth) *
          svgWidth) /
        (svgWidth / w);
      var dy =
        (((panning.startPoint.y - endPoint.y) / svg.current.clientHeight) *
          svgHeight) /
        (svgHeight / h);
      var movedViewBox = [x + dx, y + dy, w, h];
      setViewBox(movedViewBox);
      setPanning({ active: true, startPoint: endPoint });
    }
  }
  function onMouseUp(e) {
    if (panning.active) {
      const endPoint = { x: e.nativeEvent.x, y: e.nativeEvent.y };
      const [x, y, w, h] = viewBox;
      var dx =
        (((panning.startPoint.x - endPoint.x) / svg.current.clientWidth) *
          svgWidth) /
        (svgWidth / w);
      var dy =
        (((panning.startPoint.y - endPoint.y) / svg.current.clientHeight) *
          svgHeight) /
        (svgHeight / h);
      const newViewBox = [x + dx, y + dy, w, h];
      setViewBox(newViewBox);
      setPanning({ active: false });
    }
  }
  function reset() {
    const [ox, oy, ow, oh] = data.viewBox;
    const [x, y, w, h] = viewBox;

    const delta = [ox - x, oy - y, ow - w, oh - h];
    const [dx, dy, dw, dh] = delta;
    const animationDuration = 750;
    function easeOutCubic(x) {
      return 1 - Math.pow(1 - x, 3);
    }
    let start, prevTs;
    function step(ts) {
      if (start === undefined) {
        start = ts;
      }
      const elapsed = ts - start;
      if (prevTs !== ts) {
        const f = easeOutCubic(Math.min(elapsed / animationDuration, 1));
        setViewBox([x + dx * f, y + dy * f, w + dw * f, h + dh * f]);
      }
      if (elapsed < animationDuration) {
        prevTs = ts;
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }
  function zoomedOrPanned() {
    const [x, y, w, h] = viewBox;
    const [ox, oy, ow, oh] = data.viewBox;
    return x !== ox || y !== oy || w !== ow || h !== oh;
  }
  return (
    <div
      style={{
        ...props.style,
        position: 'relative',
        height: '100%',
        display: 'block',
      }}
    >
      {zoomedOrPanned() && (
        <ActionBtn
          style={{ position: 'absolute', left: '0.1em', top: '0.1em' }}
          icon={<FaUndo color="white" />}
          onClick={reset}
        />
      )}
      <svg
        className={`USMap ${props.className || ''}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox.join(' ')}
        style={{ height: '100%', width: '100%' }}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={() => setPanning({ active: false })}
        ref={svg}
      >
        <g>
          {data.paths.map(({ state, path }) => (
            <path
              key={state}
              data-name={state}
              d={path}
              fill={
                props.highlight === state
                  ? props.highlightedFill || '#bd3d44'
                  : props.stateFill || '#d3d3d3'
              }
              className={classNames({ readonly: props.readOnly })}
              onClick={(e) => {
                if (props.onClick && !props.readOnly) props.onClick(e);
              }}
            ></path>
          ))}
        </g>
      </svg>
    </div>
  );
}

USMap.propTypes = {
  onClick: PropTypes.func,
  stateFill: PropTypes.string,
  highlightedFill: PropTypes.string,
  highlight: PropTypes.string,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default USMap;
