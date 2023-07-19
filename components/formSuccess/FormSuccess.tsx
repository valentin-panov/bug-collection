import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import s from "./FormSuccess.module.scss";

interface IFormSuccess {
  text: string;
}

const FormSuccess: React.FC<IFormSuccess> = ({ text }) => (
  <section className={s.container}>
    <p className={s.content}>
      <CheckCircleOutlineIcon />
      <span className={s.text}>{text}</span>
    </p>
  </section>
);

export default FormSuccess;
