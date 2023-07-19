export const routes = [
  {
    label: "Dashboard",
    path: "dashboard",
    api: "dashboard-data",
    allowedRoles: ["user", "admin"],
  },
  {
    label: "Inventory",
    path: "inventory",
    api: "inventory",
    allowedRoles: ["admin"],
  },
  {
    label: "Account",
    path: "account",
    api: "user-role",
    allowedRoles: ["user", "admin"],
  },
  {
    label: "Settings",
    path: "settings",
    api: "bio",
    allowedRoles: ["user", "admin"],
  },
  {
    label: "Users",
    path: "users",
    api: "users",
    allowedRoles: ["admin"],
  },
  {
    label: "Laboratory",
    path: "lab",
    api: "lab",
    allowedRoles: ["admin"],
  },
];
