export interface InternalPageConfig {
  /**
   * The entire path of the page, including the base path
   */
  path: string;

  /**
   * Whether the page should be accessible by unauthenticated users
   */
  public?: boolean;

  /**
   * Hide the header for that page
   */
  hideHeader?: boolean;

  /**
   * Hide the footer for that page
   */
  hideFooter?: boolean;

  /**
   * Show the left nav for that page when the old mega nav styles are showing (`fef-header-new` cookie is set)
   */
  showLeftNav?: boolean;

  /**
   * Hide History Back Button
   */
  hideBackBtn?: boolean;
}

export enum InternalBasePaths {
  PLANS_SUBSCRIPTIONS = "/plans-subscriptions",
  AUTH = "/auth",
  SIGNUP = "/signup",
}

function inferPages<T>(object: {
  [D in keyof T]: InternalPageConfig;
}) {
  return object;
}

const InternalPages = inferPages({
  AuthService: {
    path: `${InternalBasePaths.AUTH}`,
    showLeftNav: true,
  },
  SignupService: {
    path: `${InternalBasePaths.SIGNUP}`,
    showLeftNav: true,
  },
  AccountSummaryPage: {
    path: `${InternalBasePaths.PLANS_SUBSCRIPTIONS}/account-summary`,
    showLeftNav: true,
  },
  YourPlanPage: {
    path: `${InternalBasePaths.PLANS_SUBSCRIPTIONS}/your-plan`,
    showLeftNav: true,
  },
});

export default InternalPages;
