import React from "react";
import PageTitle from "@components/common/pageTitle/PageTitle";
import s from "./Lab.module.scss";
import { TestContainer } from "@components/index";
import { MainLayout } from "@layouts/index";

const TestLab: React.FC = () => {
  return (
    <MainLayout>
      <PageTitle title="Test Laboratory" />
      <div className={s.container}>
        <TestContainer />
      </div>
    </MainLayout>
  );
};

export default TestLab;
