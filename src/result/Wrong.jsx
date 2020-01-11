import React from 'react';
import Message from './Message';
import GiveUpBtn from './GiveUpBtn';

export default function wrong(props) {
  return (
    <React.Fragment>
      <Message rating={props.rating} iconLabel="Incorrect" />
      <GiveUpBtn giveUp={props.giveUp} />
    </React.Fragment>
  );
}
