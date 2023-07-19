import React from "react";
import styles from "./classN.module.scss";

interface Props {
  payload: string;
}

const ClassN: React.FC<Props> = ({ payload }) => {
  const sample = `<p className={payload}>`;
  return (
    <>
      <h2>{sample}</h2>
      <div className={styles.code}>
        <p className={payload}>
          I&apos;m a &lt;p&nbsp;className={`{payload} /`}&gt;. Inspect me!
        </p>
      </div>
    </>
  );
};

export default ClassN;
