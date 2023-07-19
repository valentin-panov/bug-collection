import React, { useContext } from "react";
import Image from "next/image";
import logo from "@images/logo.png";
import GradientLink from "../common/buttons/GradientLink";
import { AuthContext } from "@context/AuthContext";
import MainButton from "../common/buttons/MainButton";
import { useRouter } from "next/router";
import Link from "next/link";
import { Navbar } from "../index";
import s from "./Header.module.scss";

const Header: React.FC = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const onClick = async () => {
    await router.push("/signup");
  };

  return (
    <div className={s.container}>
      <Link href={"/"} shallow={false}>
        <a className={s.container_logo}>
          <Image src={logo} alt="Logo" width={150} height={32} />
        </a>
      </Link>
      <div className={s.container_buttons}>
        {auth.isAuthenticated() ? (
          <Navbar />
        ) : (
          <>
            <MainButton
              onClick={onClick}
              text={"Sign Up"}
              loading={false}
              variant={"outlined"}
            ></MainButton>
            <GradientLink
              to={"/login"}
              // to={auth.isAuthenticated() ? "/dashboard" : "/login"}
              text="Log In"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
