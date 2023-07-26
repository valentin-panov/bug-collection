import React, { useContext } from "react";
import { AuthContext } from "@context/AuthContext";
import GradientLink from "@components/common/buttons/GradientLink";
import s from "./Homepage.module.scss";

const HomePage: React.FC = () => {
  const auth = useContext(AuthContext);

  return (
    <div className={s.homePage}>
      <div className={s.container}>
        <h1 className={s.mainTitle}>
          Discover the hidden world of bugs:
        </h1>
        <h2 className={s.subTitle}>where curiosity takes flight!</h2>
        <div className={s.linkContainer}>
          <GradientLink
            text="Get Started"
            size="large"
            to={auth.isAuthenticated() ? "/dashboard" : "/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
