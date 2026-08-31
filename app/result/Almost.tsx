import GiveUpBtn from './GiveUpBtn';
import Message from './Message';
import type ResultProps from './props';

export default function almost(props: ResultProps) {
  return (
    <>
      <Message rating={props.rating} iconLabel="Almost" />
      <GiveUpBtn />
    </>
  );
}
