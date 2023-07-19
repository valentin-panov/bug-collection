import React from "react";
import styles from "./dSIH.module.scss";

interface Props {
  payload: string;
}

const DSIH: React.FC<Props> = ({ payload }) => {
  const sample = `<div
          dangerouslySetInnerHTML={{
            __html: '${payload}'
          }}
        />`;
  return (
    <>
      <h2>{sample}</h2>
      <div className={styles.code}>
        inspect me!
        <div
          dangerouslySetInnerHTML={{
            __html: `${payload}`,
          }}
        />
      </div>
    </>
  );
};

export default DSIH;
