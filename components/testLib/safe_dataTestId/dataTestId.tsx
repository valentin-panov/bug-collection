import React from "react";
import styles from "./dataTestId.module.scss";

interface Props {
  payload: string;
}

const DataTestId: React.FC<Props> = ({ payload }) => {
  const sample = `<div className={styles.description} data-testid={payload}>`;
  return (
    <>
      <h2>{sample}</h2>
      <div className={styles.description} data-testid={payload}>
        Inspect me!
      </div>
    </>
  );
};

export default DataTestId;

// worked xss
// <img src=xxx:x onerror=javascript:alert(1)> -->
