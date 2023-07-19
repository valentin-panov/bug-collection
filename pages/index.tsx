import HomePage from "./homepage";
import React from "react";
import { MainLayout } from "@layouts/index";

const IndexPage: React.FC = () => {
  return (
    <>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </>
  );
};
export default IndexPage;
