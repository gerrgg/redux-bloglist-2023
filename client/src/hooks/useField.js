import { useState } from "react";

const useField = (type, name) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onReset = () => {
    setValue("");
  };

  return {
    placeholder: name,
    name,
    id: name,
    type,
    value,
    onChange,
    onReset,
  };
};

export default useField;
