import React from 'react';
import NextQuestionBtn from './NextQuestionBtn';

export default function gave_up(props) {
  return (
    <React.Fragment>
      <div className="message">
        <span role="img" aria-label="Incorrect">
          {props.rating.emoji}
        </span>
        <span>{props.rating.message}</span>
        {props.narrow && (
          <span
            className="text"
            style={{ textDecoration: 'underline', marginLeft: '.5em' }}
          >
            {props.question.correctAnswer}
          </span>
        )}
      </div>
      {!props.narrow && (
        <span
          className="text"
          style={{ textDecoration: 'underline', padding: '1em' }}
        >
          {props.question.correctAnswer}
        </span>
      )}

      <NextQuestionBtn nextQuestion={props.nextQuestion} />
    </React.Fragment>
  );
}
