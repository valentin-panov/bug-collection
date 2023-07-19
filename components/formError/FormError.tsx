import React from "react";
import s from "./FormError.module.scss";

interface IFormError {
  text: string;
}

const FormError: React.FC<IFormError> = ({ text }) => (
  <section className={s.container}>
    <p className={s.content}>{text}</p>
  </section>
);

export default FormError;
