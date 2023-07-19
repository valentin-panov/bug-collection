import React from "react";
import s from "./CardContent.module.scss";

interface ICardContent {
  title: string;
  body: string;
}

const CardContent: React.FC<ICardContent> = ({ title, body }) => (
  <>
    <p className={s.title}>{title}</p>
    <p className={s.body}>{body}</p>
  </>
);

export default CardContent;
