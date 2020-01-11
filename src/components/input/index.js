import MapInput from './MapInput';
import TextInput from './TextInput';
import MapTextInput from './MapTextInput';

export { MapInput };
export { TextInput };
export { MapTextInput };

export const inputs = {
  MAP: MapInput,
  TEXT: TextInput,
  MAP_TEXT: MapTextInput,
};

export function chooseInput(question) {
  return inputs[question.inputType];
}
