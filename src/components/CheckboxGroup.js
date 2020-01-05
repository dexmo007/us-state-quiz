import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

export function initAllChecked(items) {
  return items.reduce(
    (value, item) => ({
      ...value,
      [typeof item === 'string' ? item : item.value]: true,
    }),
    {}
  );
}

export function getChecked(value) {
  return Object.entries(value)
    .filter(([, checked]) => checked)
    .map(([type]) => type);
}

function CheckboxGroup(props) {
  const checkboxes = props.items.map((value) => {
    if (typeof value === 'string') {
      return { value };
    }
    return value;
  });
  const [value, setValue] = useState(
    checkboxes.reduce(
      (items, { value: itemValue }) => ({
        ...items,
        [itemValue]: props.value ? props.value[itemValue] : false,
      }),
      {}
    )
  );
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
          checked={value[itemValue]}
          onChange={(e) => {
            const checked = e.target.checked;
            const newValue = {
              ...value,
              [itemValue]: checked,
            };
            setValue(newValue);
            if (props.onChange) {
              props.onChange(newValue);
            }
          }}
        />
      ))}
    </div>
  );
}
CheckboxGroup.propTypes = {
  value: PropTypes.object,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
      }),
    ])
  ),
  onChange: PropTypes.func,
};
export default CheckboxGroup;
