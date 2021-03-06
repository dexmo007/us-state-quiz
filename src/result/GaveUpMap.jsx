import React from 'react';
import Message from './Message';
import NextQuestionBtn from './NextQuestionBtn';

export default function gave_up_map(props) {
  return (
    <React.Fragment>
      <Message rating={props.rating} iconLabel="Given up" />
      <NextQuestionBtn nextQuestion={props.nextQuestion} />
    </React.Fragment>
  );
}
