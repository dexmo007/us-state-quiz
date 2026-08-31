import classNames from 'classnames';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { Question, Rating } from '../../types';
import './index.css';
import './TextField.css';

interface TextFieldProps {
  onSubmit(value: string): void;
  question: Question;
  rating?: Rating;
  inputStyle?: CSSProperties;
}

export default function TextField(props: TextFieldProps) {
  const [key, setKey] = useState(Math.random());
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.focus();
  }, []);

  useEffect(() => {
    if (props.rating?.incorrect) {
      setKey(Math.random());
    }
  }, [props.rating]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value) {
          props.onSubmit(value);
        }
      }}
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
    >
      <input
        type="text"
        key={key}
        value={
          props.rating?.result === 'correct'
            ? props.question.correctAnswer
            : value
        }
        onChange={(e) => setValue(e.target.value)}
        className={classNames('answer', props.rating?.result)}
        ref={inputRef}
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        readOnly={props.rating?.resolved}
        style={props.inputStyle}
      />
    </form>
  );
}
