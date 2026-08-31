import type React from 'react';
import type { Question } from '../../types';
import MapInput from './MapInput';
import MapTextInput from './MapTextInput';
import TextInput from './TextInput';
import type InputProps from './props';

export { MapInput, MapTextInput, TextInput };

export type InputComponent = React.FC<InputProps> & {
  fullWidth?: boolean;
  narrowResult?: boolean;
};

export const inputs = {
  MAP: MapInput,
  TEXT: TextInput,
  MAP_TEXT: MapTextInput,
};

export function chooseInput(question: Question): InputComponent {
  return inputs[question.inputType];
}
