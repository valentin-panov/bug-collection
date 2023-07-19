import React from "react";
import s from "./CardSpacer.module.scss";

const CardSpacer: React.FC = ({ children }) => (
  <div className={s.container}>{children}</div>
);

export default CardSpacer;
