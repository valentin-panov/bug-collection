import IUser from "./IUser";

export interface IAuthState {
  token: string | null;
  expiresAt: string | null;
  userInfo: IUser;
}

export interface TAuthContext {
  authState: IAuthState;
  setAuthState: (authInfo: IAuthState) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
}

export interface IAuthStateItem {
  title: string;
  value: string | null;
}
