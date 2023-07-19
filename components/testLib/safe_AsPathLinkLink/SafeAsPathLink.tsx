import React from "react";
import styles from "./SafeAsPathLink.module.scss";
import { useRouter } from "next/router";
import { Link } from "@packages/index";

interface Props {
  payload: string;
}

const SafeAsPathLink: React.FC<Props> = ({ payload }) => {
  const { asPath } = useRouter();
  const sample = `
          <Link href={\${asPath.substring(0, asPath.lastIndexOf("/"))}/}>
          <a href={\${asPath.substring(0, asPath.lastIndexOf("/"))}/}>
            Check me out!
          </a>
          </Link>`;
  console.log(payload);
  console.log(asPath);
  return (
    <>
      <h2>{sample}</h2>
      <div className={styles.code}>
        inspect me!
        <Link href={`${asPath.substring(0, asPath.lastIndexOf("/"))}/`}>
          <a href={`${asPath.substring(0, asPath.lastIndexOf("/"))}/`}>
            Check me out!
          </a>
        </Link>
      </div>
    </>
  );
};

export default SafeAsPathLink;
