import USMap from '~/components/us-map';
import TextField from './TextField';
import './index.css';
import type InputProps from './props';

function MapTextInput(props: InputProps) {
  return (
    <>
      <span className="question">{props.question.message}</span>
      <USMap
        style={{ height: 'auto' }}
        readOnly={true}
        highlight={props.question.state.abbreviation}
      ></USMap>
      <TextField
        question={props.question}
        rating={props.rating}
        onSubmit={props.onSubmit}
        inputStyle={{
          margin: '1em',
          marginBottom: '0',
          padding: '0.5em',
        }}
      />
    </>
  );
}

MapTextInput.fullWidth = true;
MapTextInput.narrowResult = true;
export default MapTextInput;
