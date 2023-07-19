import React from "react";
import s from "./populatedInput.module.scss";

interface Props {
  payload: string;
}

const PopulatedInput: React.FC<Props> = ({ payload }) => {
  const sample = `<input name={payload} id={payload} data-idx={payload} role={payload} />`;
  return (
    <>
      <label htmlFor={"clIn"}>{sample}</label>
      <input className={s.input_field} type={"text"} name={payload} id={payload} checked={false} onChange={()=>{}}  onKeyUp={()=>{}} data-idx={payload} role={payload} />
    </>
  );
};

export default PopulatedInput;
