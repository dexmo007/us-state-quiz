import './index.css';
import type InputProps from './props';
import TextField from './TextField';

export default function TextInput(props: InputProps) {
  return (
    <div className="d-flex-v justify-center align-center">
      <span className="question">{props.question.message}</span>
      <TextField
        question={props.question}
        rating={props.rating}
        onSubmit={props.onSubmit}
      />
    </div>
  );
}
