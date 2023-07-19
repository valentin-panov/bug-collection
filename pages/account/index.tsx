import React, { useContext, useState } from "react";
import { FetchContext } from "@context/FetchContext";
import { AuthContext } from "@context/AuthContext";
import { AxiosError } from "axios";
import { MainLayout } from "@layouts/index";
import classNames from "classnames";
import { Card, PageTitle } from "@components/index";
import s from "./Account.module.scss";
import { ICsrfToken } from "@interfaces/ICsrf";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const csrfToken = res.getHeader("x-csrf-token") || "";
  return { props: { csrfToken } };
};

const Account: React.FC<ICsrfToken> = ({ csrfToken }) => {
  const { authAxios } = useContext(FetchContext);
  const auth = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const setUserRole = async (role: string) => {
    try {
      const { data } = await authAxios.patch(
        "user-role",
        {
          role,
        },
        {
          headers: {
            "x-csrf-token": csrfToken,
          },
        }
      );
      setSuccessMessage(data.message);
      setErrorMessage("");
    } catch (err: unknown) {
      setSuccessMessage("");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        const error = err as AxiosError;
        setErrorMessage(error?.response?.data.message || "Unexpected error");
      }
    }
  };

  return (
    <MainLayout>
      <PageTitle title="Account" />
      <Card>
        <p className={s.card_header}>User Role</p>
        <div className={s.card_wrapper}>
          <p className={s.card_cta}>Select a role for yourself</p>
          <div className={s.card_selectBlock}>
            <select
              defaultValue={auth.authState.userInfo?.role}
              onChange={(e) => setUserRole(e.target.value)}
              className={s.card_selectBlock_select}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {successMessage && (
              <p className={classNames(s.message, s.message_success)}>
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className={classNames(s.message, s.message_error)}>
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </Card>
    </MainLayout>
  );
};

export default Account;
