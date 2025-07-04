import s from "@styles/Error.module.scss";
import { useEffect } from "react";
import GradientLink from "../components/common/buttons/GradientLink";

export default function Xss() {
  useEffect(() => {
    // window.top[1].document.body.innerHTML = "Hi from credentialless";
    alert(window.top[1].document.cookie);
    console.log(Object.fromEntries(Object.entries(localStorage)));
  });
  return (
    <>
      <h2 className={s.title}>XSS.</h2>
      <p className={s.description}>
        <GradientLink to={`/`} text={"Go back to safety"} />
      </p>
    </>
  );
}
