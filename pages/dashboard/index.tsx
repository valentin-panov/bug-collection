import React, { useContext, useEffect, useState } from "react";
import PageTitle from "@components/common/pageTitle/PageTitle";
import DashboardMetric from "@components/dashboardMetric/DashboardMetric";
import Card from "@components/common/card/Card";
import { FetchContext } from "@context/FetchContext";
import { formatCurrency } from "@utils/index";
import DashboardChart, {
  ISalesData,
} from "@components/dashboardChart/DashboardChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { MainLayout } from "@layouts/index";
import s from "./Dashboard.module.scss";

interface IDashboardData {
  salesVolume: string;
  refunds: string;
  newCustomers: string;
  graphData: ISalesData[];
}

const Dashboard: React.FC = () => {
  const fetchContext = useContext(FetchContext);
  const [dashboardData, setDashboardData] = useState<IDashboardData | null>(
    null
  );

  useEffect(() => {
    console.log("DASHBOARD_ID");
    const getDashboardData = async () => {
      try {
        return await fetchContext.authAxios.get("dashboard-data");
      } catch (err) {
        console.log("Dashboard get error", err);
      }
    };

    getDashboardData().then((response) => {
      if (response?.status === 200) {
        setDashboardData(response.data);
      } else {
        // error handler
        console.log("Dashboard then error", response?.data.message);
      }
    });
  }, [fetchContext]);

  return (
    <MainLayout>
      <PageTitle title="Dashboard" />
      {dashboardData?.salesVolume ? (
        <>
          <div className={s.topContainer}>
            <div className={s.topContainer_cards}>
              <DashboardMetric
                title="Sales Volume"
                value={formatCurrency(dashboardData.salesVolume)}
                icon={<BarChartIcon />}
              />
            </div>
            <div className={s.topContainer_cards}>
              <DashboardMetric
                title="New Customers"
                value={dashboardData.newCustomers}
                icon={<PersonAddAltIcon />}
              />
            </div>
            <div className={s.topContainer_cards}>
              <DashboardMetric
                title="Refunds"
                value={formatCurrency(dashboardData.refunds)}
                icon={<AttachMoneyIcon />}
              />
            </div>
          </div>
          <div className={s.bottom_container}>
            <Card>
              {dashboardData && (
                <DashboardChart salesData={dashboardData.graphData} />
              )}
            </Card>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </MainLayout>
  );
};

export default Dashboard;
