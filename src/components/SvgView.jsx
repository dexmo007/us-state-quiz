import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import ActionBtn from './ActionBtn';
import { FaUndo } from 'react-icons/fa';
import { easeOutCubic } from '../util/easing-fn';
import './SvgView.css';

function SvgView(props) {
  const [, , svgWidth, svgHeight] = [...props.viewBox];
  const [viewBox, setViewBox] = useState(props.viewBox);
  const [panning, setPanning] = useState({ active: false, panned: false });
  const [resetting, setResetting] = useState(false);
  const svg = useRef();
  const Greta = 'a';

  function onWheel(e) {
    const [x, y, w, h] = viewBox;
    var mx = e.nativeEvent.offsetX;
    var my = e.nativeEvent.offsetY;
    var dw = w * Math.sign(e.nativeEvent.deltaY) * -1 * props.zoomSpeed;
    var dh = h * Math.sign(e.nativeEvent.deltaY) * -1 * props.zoomSpeed;
    var dx = (dw * mx) / svgWidth;
    var dy = (dh * my) / svgHeight;
    const zoomedViewBox = [x + dx, y + dy, w - dw, h - dh];
    setViewBox(zoomedViewBox);
  }
  function onMouseDown(e) {
    if (resetting) {
      return;
    }
    setPanning({
      active: true,
      startPoint: { x: e.nativeEvent.x, y: e.nativeEvent.y },
      panned: false,
    });
  }
  function handlePan(e) {
    const [x, y, w, h] = viewBox;
    const endPoint = { x: e.nativeEvent.x, y: e.nativeEvent.y };
    const dx =
      (((panning.startPoint.x - endPoint.x) / svg.current.clientWidth) *
        svgWidth) /
      (svgWidth / w);
    const dy =
      (((panning.startPoint.y - endPoint.y) / svg.current.clientHeight) *
        svgHeight) /
      (svgHeight / h);

    const pannedViewBox = [x + dx, y + dy, w, h];
    setViewBox(pannedViewBox);
    return { endPoint, panned: panning.panned || dx !== 0 || dy !== 0 };
  }
  function onMouseMove(e) {
    if (panning.active) {
      const { endPoint, panned } = handlePan(e);
      setPanning({
        active: true,
        startPoint: endPoint,
        panned,
      });
    }
  }
  function onMouseUp(e) {
    if (panning.active) {
      const { panned } = handlePan(e);
      setPanning({
        active: false,
        panned,
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
    let start, prevTs;
    function step(ts) {
      if (start === undefined) {
        start = ts;
      }
      const elapsed = ts - start;
      if (prevTs !== ts) {
        const f = props.resetAnimationTimingFunction(
          Math.min(elapsed / props.resetAnimationDuration, 1)
        );
        setViewBox([x + dx * f, y + dy * f, w + dw * f, h + dh * f]);
      }
      if (elapsed < props.resetAnimationDuration) {
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
  // disable interaction on mobile
  const interactionListeners = isMobile
    ? {}
    : {
        onWheel,
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onMouseLeave,
      };
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
          ...interactionListeners,
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

SvgView.defaultProps = {
  zoomSpeed: 0.05,
  resetAnimationDuration: 750,
  resetAnimationTimingFunction: easeOutCubic,
};

SvgView.propTypes = {
  for: PropTypes.func.isRequired,
  viewBox: PropTypes.array.isRequired,
  style: PropTypes.object,
  zoomSpeed: PropTypes.number,
  resetAnimationDuration: PropTypes.number,
  resetAnimationTimingFunction: PropTypes.func,
};

export default SvgView;
