import Message from './Message';
import NextQuestionBtn from './NextQuestionBtn';
import type ResultProps from './props';

export default function GaveUpMap(props: ResultProps) {
  return (
    <>
      <Message rating={props.rating} iconLabel="Given up" />
      <NextQuestionBtn />
    </>
  );
}
