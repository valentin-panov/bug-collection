import React, { createContext, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const FetchContext: React.Context<any> = createContext("");
FetchContext.displayName = "FetchContext";

const { Provider } = FetchContext;

const FetchProvider: React.FC = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { token } = authContext.authState; // TODO lets get rid of authContext

  const authAxios = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
  });

  authAxios.interceptors.request.use(
    (config) => {
      if (config.headers) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const code = error && error.response ? error.response.status : 0;
      if (code === 401 || code === 403) {
        console.log("error code", code);
      }
      return Promise.reject(error.response);
    }
  );

  return (
    <Provider
      value={{
        authAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
