import React from "react";
import s from "./Label.module.scss";

interface ILabel {
  text: string;
}

const Label: React.FC<ILabel> = ({ text }) => (
  <label className={s.container}>{text}</label>
);

export default Label;
