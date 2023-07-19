import React from "react";
import s from "./DashboardMetric.module.scss";

export interface IDashboardMetric {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const DashboardMetric: React.FC<IDashboardMetric> = ({
  title,
  value,
  icon,
}) => {
  return (
    <div className={s.container}>
      <p className={s.title}>
        {icon}
        {title}
      </p>
      <p className={s.value}>{value}</p>
    </div>
  );
};

export default DashboardMetric;
