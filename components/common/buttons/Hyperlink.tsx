import React from "react";
import Link from "next/link";
import s from "./Button.module.scss";

interface IHyperlink {
  text: string;
  to: string;
}

const Hyperlink: React.FC<IHyperlink> = ({ text, to }) => (
  <Link href={to}>
    <a className={s.link}>{text}</a>
  </Link>
);

export default Hyperlink;
