import classNames from 'classnames';
import SvgView from '~/components/SvgView';
import data from './data.json';
import './USMap.css';

interface USMapProps {
  onClick?: React.MouseEventHandler<SVGPathElement>;
  stateFill?: string;
  highlightedFill?: string;
  highlight?: string;
  readOnly?: boolean;
  style?: object;
  className?: string;
  active?: string;
}

export default function USMap(props: USMapProps) {
  return (
    <SvgView
      style={{
        ...props.style,
        height: '100%',
        display: 'block',
      }}
      viewBox={data.viewBox}
      for={(svgViewProps, { panned }) => (
        <svg
          className={`USMap ${props.className || ''}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: '100%', width: '100%' }}
          {...svgViewProps}
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
                className={classNames({
                  readonly: props.readOnly,
                  active: state === props.active,
                })}
                onClick={(e) => {
                  if (props.onClick && !props.readOnly && !panned)
                    props.onClick(e);
                }}
              ></path>
            ))}
          </g>
        </svg>
      )}
    />
  );
}
