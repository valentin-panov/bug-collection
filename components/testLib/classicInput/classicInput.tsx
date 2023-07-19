import React from "react";
import s from "./classicInput.module.scss";

interface Props {
  value: string;
  onChangeHandler: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClassicInput: React.FC<Props> = ({ value, onChangeHandler }) => {
  return (
    <>
      <label htmlFor={"clIn"}>Dynamic payload source: </label>
      <input
        id="clIn"
        value={value}
        onChange={onChangeHandler}
        className={s.input_field}
      />
    </>
  );
};

export default ClassicInput;
