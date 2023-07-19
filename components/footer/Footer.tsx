import React, { useState } from "react";
import GradientButton from "../common/buttons/GradientButton";
import AuthDebugger from "../authDebugger/AuthDebugger";
import s from "./Footer.module.scss";

const Footer: React.FC = () => {
  const [showAuthDebugger, setShowAuthDebugger] = useState(false);
  return (
    <footer className={s.container}>
      <div className={s.container_4btn}>
        <GradientButton onClick={() => setShowAuthDebugger(!showAuthDebugger)}>
          Auth Debugger
        </GradientButton>
      </div>
      <div className={s.container_authD}>
        {showAuthDebugger && <AuthDebugger />}
      </div>
    </footer>
  );
};

export default Footer;
