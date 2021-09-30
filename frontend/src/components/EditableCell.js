import React, { useState } from 'react';

const EditableCell = ({
  value: initialValue,
  row: {
    index,
    original: { isEditing },
  },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };
  let jsx;
  if (isEditing) {
    jsx = <input value={value} onChange={onChange} onBlur={onBlur} />;
  } else {
    jsx = <input value={value} onChange={onChange} onBlur={onBlur} disabled />;
  }

  return jsx;
};

export default EditableCell;
