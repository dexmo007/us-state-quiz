import { useState } from 'react';
import Modal from 'react-modal';
import { questions } from '~/quiz';
import { actions, useAppDispatch, useAppSelector } from '~/store';
import CheckboxGroup from './CheckboxGroup';
import GearCorner from './GearCorner';

export default function GameSettings() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const persistentQuestionCategories = useAppSelector(
    (state) => state.questionCategories
  );

  const [editableQuestionCategories, setEditableQuestionCategories] = useState(
    persistentQuestionCategories
  );

  const close = () => {
    setOpen(false);
    dispatch(actions.changeQuestionCategories(editableQuestionCategories));
  };
  return (
    <>
      <GearCorner onClick={() => setOpen(true)} />
      <Modal
        isOpen={open}
        onRequestClose={close}
        style={{
          content: {
            background: '#282c34',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
        closeTimeoutMS={250}
      >
        <h1>What games do you wanna play?</h1>
        <CheckboxGroup
          value={persistentQuestionCategories}
          items={questions.map(({ category, description, displayName }) => ({
            value: category,
            label: displayName,
            subtitle: description,
          }))}
          minChecked={1}
          onChange={setEditableQuestionCategories}
        />
        <button
          className="fit-content"
          style={{
            marginTop: 'auto',
            alignSelf: 'center',
          }}
          onClick={close}
        >
          <span>Go!</span>
          <span className="rocket" role="img" aria-label="Go">
            🚀
          </span>
        </button>
      </Modal>
    </>
  );
}
