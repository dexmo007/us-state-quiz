import React from 'react';
import NextQuestionBtn from './NextQuestionBtn';
import type ResultProps from './props';

export default function gave_up(props: ResultProps) {
  function correctAnswer(style: React.CSSProperties) {
    return (
      <span className="text" style={{ textDecoration: 'underline', ...style }}>
        {props.question.correctAnswer}
      </span>
    );
  }
  return (
    <>
      <div className="message">
        <span role="img" aria-label="Incorrect">
          {props.rating.emoji}
        </span>
        <span>{props.rating.message}</span>
        {props.quizInput.narrowResult && correctAnswer({ marginLeft: '.5em' })}
      </div>
      {!props.quizInput.narrowResult && correctAnswer({ padding: '1em' })}

      <NextQuestionBtn />
    </>
  );
}
