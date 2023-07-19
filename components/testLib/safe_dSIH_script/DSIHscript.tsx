import React from "react";
import styles from "./dSIHscript.module.scss";

interface Props {
  payload: string;
}

const DSIHscript: React.FC<Props> = ({ payload }) => {
  const sample = `<script
          data-testid="data-layer"
          dangerouslySetInnerHTML={{
            __html: "window.digitalData=${JSON.stringify(payload)}"
          }}
        />`;
  return (
    <>
      <h2>{sample}</h2>
      <div className={styles.code}>
        inspect me!
        <script
          data-testid="data-layer"
          dangerouslySetInnerHTML={{
            __html: `window.digitalData=${JSON.stringify(payload)}`,
          }}
        />
      </div>
    </>
  );
};

export default DSIHscript;
