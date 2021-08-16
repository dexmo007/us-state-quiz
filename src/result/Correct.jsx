import React from 'react';
import Message from './Message';
import NextQuestionBtn from './NextQuestionBtn';

export default function correct(props) {
  return (
    <>
      <Message rating={props.rating} iconLabel="Congratulations" />
      <NextQuestionBtn nextQuestion={props.nextQuestion} />
    </>
  );
}
