import React from "react";
import s from "./Input.module.scss";

interface IInput {
  ariaLabel: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  field: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

const Input: React.FC<IInput> = ({
  ariaLabel,
  name,
  type,
  placeholder,
  field,
}) => (
  <input
    {...field}
    aria-label={ariaLabel}
    name={name}
    type={type}
    className={s.container}
    placeholder={placeholder}
  />
);

export default Input;
