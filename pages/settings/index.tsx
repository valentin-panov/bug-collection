import React, { useContext, useEffect, useState } from "react";
import PageTitle from "@components/common/pageTitle/PageTitle";
import Card from "@components/common/card/Card";
import GradientButton from "@components/common/buttons/GradientButton";
import { Field, Form, Formik } from "formik";
import { FetchContext } from "@context/FetchContext";
import FormError from "@components/formError/FormError";
import FormSuccess from "@components/formSuccess/FormSuccess";
import { AxiosError } from "axios";
import { MainLayout } from "@layouts/index";
import s from "./Settings.module.scss";
import { AuthContext } from "@context/AuthContext";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ICsrfToken } from "@interfaces/ICsrf";
import { extractCookieByName } from "@utils/storage";

interface IValues {
  bio: string;
  // formikHelpers: FormikHelpers<FormikValues>;
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  try {
    const csrfToken =
      (res.getHeader("x-csrf-token") as string) ||
      extractCookieByName(req.headers.cookie as string, "_csrfSecret") ||
      null;
    return { props: { csrfToken } };
  } catch (e) {
    return { props: { csrfToken: null } };
  }
};

const Settings: React.FC<ICsrfToken> = ({ csrfToken }) => {
  const { authAxios } = useContext(FetchContext);
  const {
    authState: {
      userInfo: { _id },
    },
  } = useContext(AuthContext);
  const [bio, setBio] = useState<IValues>({ bio: "" });
  const [successMessage, setSuccessMessage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const getBio = async () => {
      try {
        return await authAxios.get("bio");
      } catch (err) {
        console.log("getBio error", err);
      }
    };
    getBio().then((response) => {
      if (response?.status === 200) {
        setBio({ bio: response.data.bio });
      } else {
        // error handler
        console.log("getBio then error", response?.data.message);
      }
    });
  }, [authAxios, _id]);

  const saveBio = async (bio: IValues) => {
    try {
      const { data } = await authAxios.patch(
        "bio",
        { bio },
        {
          headers: {
            "x-csrf-token": csrfToken || null,
          },
        }
      );
      setErrorMessage("");
      setSuccessMessage(data.message);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        const error = err as AxiosError;
        setErrorMessage(error?.response?.data.message || "Unexpected error");
      }
      setSuccessMessage("");
    }
  };
  return (
    <MainLayout>
      <PageTitle title="Settings" />
      <Card>
        <h2 className={s.title}>Fill Out Your Bio</h2>
        {successMessage && <FormSuccess text={successMessage} />}
        {errorMessage && <FormError text={errorMessage} />}
        <Formik
          initialValues={bio}
          onSubmit={(values) => saveBio(values)}
          enableReinitialize={true}
        >
          {() => (
            <Form className={s.formContainer}>
              <Field
                className={s.formField}
                component="textarea"
                name="bio"
                placeholder="Your bio here"
              />
              {/*<input type="hidden" value={csrfToken} />*/}
              <GradientButton type="submit">Save</GradientButton>
            </Form>
          )}
        </Formik>
      </Card>
    </MainLayout>
  );
};

export default Settings;
