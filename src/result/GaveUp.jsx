import React from 'react';
import NextQuestionBtn from './NextQuestionBtn';

export default function gave_up(props) {
  function correctAnswer(style) {
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

      <NextQuestionBtn nextQuestion={props.nextQuestion} />
    </>
  );
}
