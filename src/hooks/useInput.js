// src/hooks/useInput.js
import { useState } from 'react';

const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return {
    value,
    handleChange,
    reset: () => setValue(initialValue),
  };
};

export default useInput;
