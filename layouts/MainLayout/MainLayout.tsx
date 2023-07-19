import React, { ReactNode, useContext } from "react";
import Head from "next/head";
import { Footer, Header, Main, Sidebar } from "@components/index";
import { AuthContext } from "@context/AuthContext";
import s from "./MainLayout.module.scss";

interface MainProps {
  children: ReactNode | ReactNode[];
  keywords?: string;
}

const MainLayout: React.FC<MainProps> = ({ children, keywords }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Head>
        <meta
          name="keywords"
          content={
            "vulnerable, nextjs, application, security" + keywords &&
            `, ${keywords}`
          }
        />
        <meta name={"author"} content={"Valentin Panov"} />
        <title>Metropolitan book store</title>
      </Head>
      <div className={s.container}>
        <Header />
        <div className={s.container_main}>
          {isAuthenticated() && <Sidebar />}
          <Main>{children}</Main>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default MainLayout;
