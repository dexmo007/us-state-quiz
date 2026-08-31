import { actions, useAppDispatch } from '../store';

export default function NoResult() {
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        className="message"
        aria-hidden="true"
        style={{ visibility: 'hidden' }}
      >
        <span role="img" aria-hidden="true">
          ❌
        </span>
        <span>No result</span>
      </div>
      <button
        className="fit-content"
        aria-hidden="true"
        onClick={() => dispatch(actions.giveUp())}
      >
        <span role="img" aria-labelledby="brainfuck">
          🤯
        </span>
        <span>Don&apos;t know</span>
      </button>
    </>
  );
}
