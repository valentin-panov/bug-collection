import React, { useContext, useEffect, useMemo, useState } from "react";
import { Form, Formik } from "formik";
import Card from "@components/common/card/Card";
import Hyperlink from "@components/common/buttons/Hyperlink";
import Label from "@components/common/label/Label";
import FormInput from "@components/formInput/FormInput";
import FormSuccess from "@components/formSuccess/FormSuccess";
import FormError from "@components/formError/FormError";
import GradientBar from "@components/common/gradientBar/GradientBar";
import { AuthContext } from "@context/AuthContext";
import GradientButton from "@components/common/buttons/GradientButton";
import { AxiosError, AxiosResponse } from "axios";
import { ICredentials } from "@interfaces/ICredentials";
import Image from "next/image";
import logo from "@images/logo.png";
import { useRouter } from "next/router";
import Link from "next/link";
import s from "./Login.module.scss";
import { AuthService } from "@services/index";

const Yup = require("yup");

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [loginSuccess, setLoginSuccess] = useState<string>();
  const [loginError, setLoginError] = useState<string>();
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const AuthServiceInstance = useMemo(() => new AuthService(), []);

  const submitCredentials = async (credentials: ICredentials) => {
    try {
      setLoginLoading(true);
      const { data }: AxiosResponse = await AuthServiceInstance.post(
        `authenticate`,
        new URLSearchParams(credentials as unknown as Record<string, string>)
      );

      authContext.setAuthState(data);
      setLoginSuccess(data.message);
      setLoginError("");

      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 700);
    } catch (err) {
      setLoginLoading(false);
      if (err instanceof Error) {
        setLoginError(err.message);
      } else {
        const error = err as AxiosError;
        setLoginError(error?.response?.data.message || "Unexpected error");
      }
      setLoginSuccess("");
    }
  };

  useEffect(() => {
    if (redirectOnLogin) {
      router.push("/dashboard").then();
      // router.push("/").then();
    }
  }, [redirectOnLogin, router]);

  return (
    <>
      <section className={s.container}>
        <div className={s.container_cutter}>
          <GradientBar />
          <Card>
            <div className={s.cardContent}>
              <div className={s.cardContent_inlay}>
                <div>
                  <div className={s.logoLinkWrapper}>
                    <Link href={"/"} shallow={false}>
                      <a className={s.logo}>
                        <Image src={logo} alt="Logo" width={150} height={32} />
                      </a>
                    </Link>
                  </div>
                  <h2 className={s.title}>Log in to your account</h2>
                  <p className={s.subtitle}>
                    Don&apos;t have an account?{" "}
                    <Hyperlink to="signup" text="Sign up now" />
                  </p>
                </div>

                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={(values: ICredentials) => submitCredentials(values)}
                  validationSchema={LoginSchema}
                >
                  {() => (
                    <Form className={s.formContainer}>
                      {loginSuccess && <FormSuccess text={loginSuccess} />}
                      {loginError && <FormError text={loginError} />}
                      <div>
                        <div className={s.formContainer_inputWrapper}>
                          <div
                            className={
                              s.formContainer_inputWrapper_labelWrapper
                            }
                          >
                            <Label text="Email" />
                          </div>
                          <FormInput
                            ariaLabel="Email"
                            name="email"
                            type="text"
                            placeholder="Email"
                          />
                        </div>
                        <div className={s.formContainer_inputWrapper}>
                          <div
                            className={
                              s.formContainer_inputWrapper_labelWrapper
                            }
                          >
                            <Label text="Password" />
                          </div>
                          <FormInput
                            ariaLabel="Password"
                            name="password"
                            type="password"
                            placeholder="Password"
                          />
                        </div>
                      </div>

                      <div className={s.forgotLink}>
                        <Hyperlink
                          to="forgot-password"
                          text="Forgot your password?"
                        />
                      </div>

                      <div className={s.submitBtnWrapper}>
                        <GradientButton type="submit" loading={loginLoading}>
                          Log In
                        </GradientButton>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Login;
