import React, { useState } from 'react';

const EditableCell = ({
  value: initialValue,
  row: {
    index,
    original: { isEditing },
  },
  column: { id },
  updateMyData,
  toDisplayFormat,
  toStoreType,
  valueRegex,
  defaultValue,
}) => {
  const [dataValue, setDataValue] = useState(initialValue);
  const [displayValue, setDisplayValue] = useState(
    toDisplayFormat(initialValue)
  );

  const onFocus = () => {
    setDisplayValue(dataValue);
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (!value || value.match(valueRegex)) {
      setDisplayValue(e.target.value);
    }
  };

  const onBlur = () => {
    let newDataValue;
    if (displayValue) newDataValue = toStoreType(displayValue);
    else newDataValue = defaultValue;
    setDataValue(newDataValue);
    updateMyData(index, id, newDataValue);
    setDisplayValue(toDisplayFormat(newDataValue));
  };

  let jsx;
  if (isEditing) {
    jsx = (
      <input
        value={displayValue}
        onFocus={onFocus}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  } else {
    jsx = (
      <input
        value={displayValue}
        onFocus={onFocus}
        onChange={onChange}
        onBlur={onBlur}
        disabled
      />
    );
  }

  return jsx;
};

export default EditableCell;
