import React, { useContext } from "react";
import { AuthContext } from "@context/AuthContext";
import { IAuthStateItem } from "@interfaces/IAuth";
import classNames from "classnames";
import s from "./AuthDebugger.module.scss";

const AuthStateItem: React.FC<IAuthStateItem> = ({ title, value }) => (
  <div className={s.container}>
    <p className={classNames(s.title, s.mb_2)}>{title}</p>
    <pre className={s.pre_wrap}>
      <code className={s.code}>{value}</code>
    </pre>
  </div>
);

const AuthDebugger: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { token, expiresAt, userInfo } = authContext.authState;
  return (
    <section className={s.section}>
      <div className={s.mb_2}>
        <AuthStateItem title="Token" value={token} />
      </div>
      <div className={s.mb_2}>
        <AuthStateItem title="Expiry" value={expiresAt} />
      </div>
      <div className={s.mb_2}>
        <AuthStateItem
          title="User Info"
          value={JSON.stringify(userInfo, null, 2)}
        />
      </div>
    </section>
  );
};

export default AuthDebugger;
