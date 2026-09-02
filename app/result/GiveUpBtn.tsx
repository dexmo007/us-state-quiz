import { actions, useAppDispatch } from '~/store';

export default function GiveUpBtn() {
  const dispatch = useAppDispatch();

  return (
    <button className="fit-content" onClick={() => dispatch(actions.giveUp())}>
      <span>Give up</span>
      <span role="img" aria-label="crying out loud">
        😩
      </span>
    </button>
  );
}
