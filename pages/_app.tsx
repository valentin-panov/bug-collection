import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AuthProvider } from "@context/AuthContext";
import { FetchProvider } from "@context/FetchContext";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <FetchProvider>
        <Component {...pageProps} />
      </FetchProvider>
    </AuthProvider>
  );
}
