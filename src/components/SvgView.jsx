import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ActionBtn from './ActionBtn';
import { FaUndo } from 'react-icons/fa';
import './SvgView.css';

function SvgView(props) {
  const [, , svgWidth, svgHeight] = [...props.viewBox];
  const [viewBox, setViewBox] = useState(props.viewBox);
  const [panning, setPanning] = useState({ active: false, panned: false });
  const [resetting, setResetting] = useState(false);
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
      panned: false,
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
      setPanning({
        active: true,
        startPoint: endPoint,
        panned: panning.panned || dx !== 0 || dy !== 0,
      });
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
      setPanning({
        active: false,
        panned: panning.panned || dx !== 0 || dy !== 0,
      });
    }
  }
  function onMouseLeave() {
    setPanning({ active: false });
  }
  function reset() {
    setResetting(true);
    const [ox, oy, ow, oh] = props.viewBox;
    const [x, y, w, h] = viewBox;

    const delta = [ox - x, oy - y, ow - w, oh - h];
    const [dx, dy, dw, dh] = delta;
    const animationDuration = props.resetAnimationDuration || 750;
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
      } else {
        setResetting(false);
      }
    }
    window.requestAnimationFrame(step);
  }
  function zoomedOrPanned() {
    const [x, y, w, h] = viewBox;
    const [ox, oy, ow, oh] = props.viewBox;
    return x !== ox || y !== oy || w !== ow || h !== oh;
  }
  return (
    <div
      className="SvgView"
      style={{
        ...props.style,
        position: 'relative',
      }}
    >
      <ActionBtn
        className={classNames('reset-zoom-btn', {
          shown: zoomedOrPanned() && !resetting,
        })}
        style={{ position: 'absolute', left: '0.1em', top: '0.1em' }}
        icon={<FaUndo color="white" />}
        onClick={reset}
      />

      {props.for(
        {
          viewBox,
          onWheel,
          onMouseDown,
          onMouseMove,
          onMouseUp,
          onMouseLeave,
          ref: svg,
        },
        {
          panning: panning.active,
          panned: panning.panned,
        }
      )}
    </div>
  );
}

SvgView.propTypes = {
  for: PropTypes.func.isRequired,
  viewBox: PropTypes.array.isRequired,
  style: PropTypes.object,
  resetAnimationDuration: PropTypes.number,
};

export default SvgView;
