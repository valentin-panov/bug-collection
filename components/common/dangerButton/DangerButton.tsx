import React from "react";
import s from "./DangerButton.module.scss";

interface IDangerButton {
  text: string;
  onClick: () => void;
}

const DangerButton: React.FC<IDangerButton> = ({ text, onClick }) => (
  <button onClick={onClick} className={s.btn}>
    {text}
  </button>
);

export default DangerButton;
