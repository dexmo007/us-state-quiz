import React from 'react';
import Message from './Message';
import GiveUpBtn from './GiveUpBtn';

export default function almost(props) {
  return (
    <>
      <Message rating={props.rating} iconLabel="Almost" />
      <GiveUpBtn giveUp={props.giveUp} />
    </>
  );
}
