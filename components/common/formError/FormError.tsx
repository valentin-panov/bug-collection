import React from "react";
import s from "./FormError.module.scss";

interface IFormError {
  text: string;
}

const FormError: React.FC<IFormError> = ({ text }) => (
  <span className={s.container}>{text}</span>
);

export default FormError;
