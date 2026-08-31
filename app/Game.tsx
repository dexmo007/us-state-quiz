import { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { chooseInput } from './components/input';
import './Game.css';
import Result from './result/Result';
import { actions, useAppDispatch, useAppSelector } from './store';

export default function Game() {
  const question = useAppSelector((states) => states.question);
  const rating = useAppSelector((state) => state.rating);
  const QuizInput = chooseInput(question);
  const nodeRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  return (
    <>
      <SwitchTransition>
        <CSSTransition
          key={question.id}
          nodeRef={nodeRef}
          addEndListener={(done) =>
            nodeRef.current?.addEventListener('transitionend', done, false)
          }
          classNames="question-transition"
        >
          <div
            ref={nodeRef}
            className="main"
            style={{
              width: QuizInput.fullWidth ? '100vw' : undefined,
            }}
          >
            <QuizInput
              question={question}
              rating={rating}
              onSubmit={(value) =>
                rating?.resolved
                  ? dispatch(actions.nextQuestion())
                  : dispatch(actions.answer(value))
              }
            />
            <Result question={question} rating={rating} quizInput={QuizInput} />
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}
