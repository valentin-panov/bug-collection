import React, { useContext } from "react";
import classNames from "classnames";
import { AuthContext } from "@context/AuthContext";
import { useRouter } from "next/router";
import GradientButton from "../common/buttons/GradientButton";
import { routes } from "@utils/routes";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PieChartIcon from "@mui/icons-material/PieChart";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupsIcon from "@mui/icons-material/Groups";
import BiotechIcon from "@mui/icons-material/Biotech";
import s from "./Sidebar.module.scss";

const icons: Record<string, React.ReactNode> = {
  Dashboard: <TrendingUpIcon />,
  Inventory: <PieChartIcon />,
  Account: <ManageAccountsIcon />,
  Settings: <SettingsIcon />,
  Users: <GroupsIcon />,
  Laboratory: <BiotechIcon />,
};

interface NavItemProps {
  navItem: {
    path: string;
    icon: React.ReactNode;
    label: string;
  };
}

const NavItem: React.FC<NavItemProps> = ({ navItem }) => {
  const router = useRouter();
  const isCurrentRoute = router.pathname === `/${navItem.path}`;
  const onClick = () => {
    router.push(navItem.path).then();
  };
  return (
    <GradientButton onClick={onClick}>
      <div
        className={classNames(
          s.pageLink_container,
          isCurrentRoute
            ? s.pageLink_container_textCurrent
            : s.pageLink_container_text
        )}
      >
        <div className={s.iconContainer}>{navItem.icon}</div>
        <span className={s.label}>{navItem.label}</span>
      </div>
    </GradientButton>
  );
};

interface NavItemContainerProps {}

const NavItemContainer: React.FC<NavItemContainerProps> = ({ children }) => (
  <>{children}</>
);

const Sidebar = () => {
  const auth = useContext(AuthContext);
  const role = auth.authState.userInfo?.role;
  return (
    <section className={s.container}>
      {routes.map((route, i) => (
        <NavItemContainer key={i}>
          {route.allowedRoles.includes(role) && (
            <NavItem navItem={{ ...route, icon: icons[route.label] }} />
          )}
        </NavItemContainer>
      ))}
    </section>
  );
};

export default Sidebar;
