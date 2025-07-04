import s from "@styles/Error.module.scss";
import { useEffect, useState } from "react";
import GradientLink from "../components/common/buttons/GradientLink";

export default function Xss() {
  const [cookies, setCookies] = useState(null);
  const [frames, setFrames] = useState(null);
  const [top, setTop] = useState(null);
  const [localStorageDump, setLocalStorageDump] = useState(null);

  useEffect(() => {
    // window.top[1].document.body.innerHTML = "Hi from credentialless";

    try {
      const cookie = window.top[1]?.document?.cookie || null;
      setCookies(cookie);
      console.info("Cookies:", cookie);
    } catch (e) {
      console.error("Cookie access error:", e);
    }

    try {
      const ls = Object.fromEntries(Object.entries(localStorage));
      setLocalStorageDump(ls);
      console.info("LocalStorage:", ls);
    } catch (e) {
      console.error("LocalStorage access error:", e);
    }

    try {
      setFrames(window.frames.length.toString());
    } catch (e) {
      console.error("Frames access error:", e);
    }

    try {
      setTop(String(window.top));
    } catch (e) {
      console.error("Top access error:", e);
    }
  }, []);

  return (
    <>
      <h2 className={s.title}>XSS:</h2>
      <p>COOKIES: {String(cookies) ?? "Unavailable"}</p>
      <p>FRAMES: {frames ?? "Unavailable"}</p>
      <p>TOP: {String(top) ?? "Unavailable"}</p>
      <p>
        localStorageDump:{" "}
        {JSON.stringify(localStorageDump, null, 2) ?? "Unavailable"}
      </p>
      <p className={s.description}>
        <GradientLink to="/" text="Go back to safety" />
      </p>
    </>
  );
}
