import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import CheckboxGroup from './CheckboxGroup';
import GearCorner from './GearCorner';
import { questions } from '../quiz';
import { setQuestionCategories } from '../store/actions';

function GameSettings(props) {
  const [open, setOpen] = useState(false);
  const [questionCategories, setQuestionCategories] = useState(
    props.questionCategories
  );

  const close = () => {
    setOpen(false);
    props.setQuestionCategories(questionCategories);
  };
  return (
    <React.Fragment>
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
          value={questionCategories}
          items={questions.map(({ category, description, displayName }) => ({
            value: category,
            label: displayName,
            subtitle: description,
          }))}
          onChange={setQuestionCategories}
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
    </React.Fragment>
  );
}

GameSettings.propTypes = {
  questionCategories: PropTypes.object,
  setQuestionCategories: PropTypes.func.isRequired,
};

export default connect(
  ({ questionCategories }) => ({
    questionCategories,
  }),
  (dispatch) => ({
    setQuestionCategories: (questionCategories) =>
      dispatch(setQuestionCategories(questionCategories)),
  })
)(GameSettings);
