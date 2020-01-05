import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import CheckboxGroup from './components/CheckboxGroup';
import questions from './questions';

function GameSettings(props) {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
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
        value={props.questionTypes}
        items={Object.entries(questions).map(
          ([value, { description, displayName }]) => ({
            value,
            label: displayName,
            subtitle: description,
          })
        )}
        onChange={props.onQuestionTypesChanged}
      />
      <button
        className="fit-content"
        style={{
          marginTop: 'auto',
          alignSelf: 'center',
        }}
        onClick={props.onClose}
      >
        <span>Go!</span>
        <span className="rocket" role="img" aria-label="Go">
          🚀
        </span>
      </button>
    </Modal>
  );
}

GameSettings.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  questionTypes: PropTypes.object,
  onQuestionTypesChanged: PropTypes.func.isRequired,
};

export default GameSettings;
