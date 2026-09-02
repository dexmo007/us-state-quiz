import { useMemo } from 'react';
import { FlipNumbers } from 'react-flip-numbers';
import useWindowSize from '~/hooks/use-window-size';
import { useAppSelector } from '~/store';
import './Streak.css';

export default function Streak() {
  const streak = useAppSelector((state) => state.streak);
  const [width, height] = useWindowSize();
  const vmin = useMemo(
    () => (height < width ? height : width) / 100,
    [width, height]
  );

  return (
    <div className="Streak">
      <span style={{ fontSize: '.7em' }}>Streak</span>
      <FlipNumbers
        play
        color="#fff"
        background="#282c34"
        width={10 + 3 * vmin}
        height={10 + 3 * vmin}
        delay={0.175}
        duration={0.175}
        numbers={`${streak}`}
      />
    </div>
  );
}
