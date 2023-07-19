import React from "react";
import s from "./PageTitle.module.scss";

interface IPageTitle {
  title: string;
}

const PageTitle: React.FC<IPageTitle> = ({ title }) => (
  <div className={s.wrapper}>
    <h2 className={s.content}>{title}</h2>
  </div>
);

export default PageTitle;
