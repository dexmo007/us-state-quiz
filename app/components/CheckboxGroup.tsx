import { useMemo, useState } from 'react';
import Checkbox from './Checkbox';

interface CheckboxGroupProps {
  value?: string[];
  items: (
    | string
    | {
        label?: string;
        value: string;
        subtitle?: string;
      }
  )[];
  onChange?(newValue: string[]): void;
  minChecked?: number;
}

function CheckboxGroup(props: CheckboxGroupProps) {
  const checkboxes = useMemo(
    () =>
      props.items.map((value) => {
        if (typeof value === 'string') {
          return { value };
        }
        return value;
      }),
    [props.items]
  );

  const [value, setValue] = useState(props.value ?? []);
  return (
    <div className="d-flex-v">
      {checkboxes.map(({ value: itemValue, label, subtitle }) => (
        <Checkbox
          style={{
            margin: '.3em',
          }}
          key={itemValue}
          label={label || itemValue}
          subtitle={subtitle}
          checked={value.includes(itemValue)}
          onChange={(e) => {
            const checked = e.target.checked;
            // unchecking is denied if minimum reached
            if (!checked && value.length <= (props.minChecked || 0)) {
              return;
            }
            let newValue;
            if (checked) {
              newValue = [...value, itemValue];
            } else {
              newValue = value.filter((v) => v !== itemValue);
            }
            setValue(newValue);
            if (props.onChange) props.onChange(newValue);
          }}
        />
      ))}
    </div>
  );
}
export default CheckboxGroup;
