import { actions, useAppDispatch } from '../store';

export default function NextQuestionBtn() {
  const dispatch = useAppDispatch();

  return (
    <button
      className="fit-content"
      onClick={() => dispatch(actions.nextQuestion())}
    >
      <span>Next Question</span>
      <span className="rocket" role="img" aria-label="Go">
        🚀
      </span>
    </button>
  );
}
