import classNames from 'classnames';
import { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { FaUndo } from 'react-icons/fa';
import { easeOutCubic } from '~/util/easing-fn';
import ActionBtn from './ActionBtn';
import './SvgView.css';

interface SvgViewProps {
  for(
    svgProps: React.SVGProps<SVGSVGElement>,
    attrs: { panned?: boolean; panning?: boolean }
  ): React.ReactNode;
  viewBox: number[];
  style?: object;
  zoomSpeed?: number;
  resetAnimationDuration?: number;
  resetAnimationTimingFunction?(x: number): number;
}

interface PanningState {
  active: boolean;
  panned?: boolean;
  startPoint?: { x: number; y: number };
}

export default function SvgView({
  zoomSpeed = 0.05,
  resetAnimationDuration = 750,
  resetAnimationTimingFunction = easeOutCubic,
  ...props
}: SvgViewProps) {
  const [, , svgWidth, svgHeight] = [...props.viewBox];
  const [viewBox, setViewBox] = useState(props.viewBox);
  const [panning, setPanning] = useState<PanningState>({
    active: false,
    panned: false,
  });
  const [resetting, setResetting] = useState(false);
  const svg = useRef<SVGSVGElement>(null);

  function onWheel(e: React.WheelEvent) {
    const [x, y, w, h] = viewBox;
    const mx = e.nativeEvent.offsetX;
    const my = e.nativeEvent.offsetY;
    const dw = w * Math.sign(e.nativeEvent.deltaY) * -1 * zoomSpeed;
    const dh = h * Math.sign(e.nativeEvent.deltaY) * -1 * zoomSpeed;
    const dx = (dw * mx) / svgWidth;
    const dy = (dh * my) / svgHeight;
    const zoomedViewBox = [x + dx, y + dy, w - dw, h - dh];
    setViewBox(zoomedViewBox);
  }
  function onMouseDown(e: React.MouseEvent) {
    if (resetting) {
      return;
    }
    setPanning({
      active: true,
      startPoint: { x: e.nativeEvent.x, y: e.nativeEvent.y },
      panned: false,
    });
  }
  function handlePan(e: React.MouseEvent) {
    if (!svg.current) return;
    if (!panning.startPoint) return;

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
  function onMouseMove(e: React.MouseEvent) {
    if (!svg.current || !panning.active) {
      return;
    }
    const { endPoint, panned } = handlePan(e)!;
    setPanning({
      active: true,
      startPoint: endPoint,
      panned,
    });
  }
  function onMouseUp(e: React.MouseEvent) {
    if (!panning.active) {
      return;
    }
    const { panned } = handlePan(e)!;
    setPanning({
      active: false,
      panned,
    });
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
    let start: number, prevTs: number;
    function step(ts: number) {
      if (start === undefined) {
        start = ts;
      }
      const elapsed = ts - start;
      if (prevTs !== ts) {
        const f = resetAnimationTimingFunction(
          Math.min(elapsed / resetAnimationDuration, 1)
        );
        setViewBox([x + dx * f, y + dy * f, w + dw * f, h + dh * f]);
      }
      if (elapsed < resetAnimationDuration) {
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
          viewBox: viewBox.join(' '),
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
