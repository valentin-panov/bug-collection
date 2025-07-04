import s from "@styles/Error.module.scss";
import { useEffect } from "react";
import GradientLink from "../components/common/buttons/GradientLink";

export default function Xss() {
  useEffect(() => {
    // window.top[1].document.body.innerHTML = "Hi from credentialless";
    try {
      console.info(window.top[1]?.document?.cookie);
    } catch (e) {
      console.error(e);
    }
    try {
      console.info(Object.fromEntries(Object.entries(localStorage)));
    } catch (e) {
      console.error(e);
    }
  }, []);
  return (
    <>
      <h2 className={s.title}>XSS.</h2>
      <p>COOKIES: {window?.top[1]?.document?.cookie}</p>
      <p>FRAMES: {window.frames}</p>
      <p>TOP: {window.top}</p>
      <p className={s.description}>
        <GradientLink to={`/`} text={"Go back to safety"} />
      </p>
    </>
  );
}
