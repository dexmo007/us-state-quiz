import type { Rating } from '~/types';

interface MessageProps {
  iconLabel: string;
  rating: Rating;
}

export default function Message(props: MessageProps) {
  return (
    <div className="message">
      <span role="img" aria-label={props.iconLabel}>
        {props.rating.emoji}
      </span>
      <span>{props.rating.message}</span>
    </div>
  );
}
