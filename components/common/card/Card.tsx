import React from "react";
import s from "./Card.module.scss";

const Card: React.FC = ({ children }) => (
  <div className={s.container}>{children}</div>
);

export default Card;
