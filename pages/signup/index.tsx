import React, { useContext, useEffect, useMemo, useState } from "react";
import { Form, Formik } from "formik";
import Card from "@components/common/card/Card";
import GradientButton from "@components/common/buttons/GradientButton";
import Hyperlink from "@components/common/buttons/Hyperlink";
import Label from "@components/common/label/Label";
import FormInput from "@components/formInput/FormInput";
import { AuthContext } from "@context/AuthContext";
import GradientBar from "@components/common/gradientBar/GradientBar";
import FormError from "@components/formError/FormError";
import FormSuccess from "@components/formSuccess/FormSuccess";
import { AxiosError, AxiosResponse } from "axios";
import { ICredentials } from "@interfaces/ICredentials";
import logo from "@images/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import s from "./Singup.module.scss";
import { SignupService } from "@services/index";

const Yup = require("yup");

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Signup: React.FC = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [signupSuccess, setSignupSuccess] = useState<string>();
  const [signupError, setSignupError] = useState<string>();
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const SignupServiceInstance = useMemo(() => new SignupService(), []);

  const submitCredentials = async (credentials: ICredentials) => {
    try {
      setLoginLoading(true);
      const { data }: AxiosResponse = await SignupServiceInstance.post(
        ``,
        new URLSearchParams(credentials as unknown as Record<string, string>)
      );

      authContext.setAuthState(data);
      setSignupSuccess(data.message);
      setSignupError("");

      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 700);
    } catch (err) {
      setLoginLoading(false);
      if (err instanceof Error) {
        setSignupError(err.message);
      } else {
        const error = err as AxiosError;
        setSignupError(error?.response?.data.message || "Unexpected error");
      }
      setSignupSuccess("");
    }
  };

  useEffect(() => {
    if (redirectOnLogin) {
      router.push("/dashboard").then();
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
                  <h2 className={s.title}>Sign up for an account</h2>
                  <p className={s.subtitle}>
                    Already have an account?{" "}
                    <Hyperlink to="login" text="Log in now" />
                  </p>
                </div>
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                  }}
                  onSubmit={(values: ICredentials) => submitCredentials(values)}
                  validationSchema={SignupSchema}
                >
                  {() => (
                    <Form className={s.formContainer}>
                      {signupSuccess && <FormSuccess text={signupSuccess} />}
                      {signupError && <FormError text={signupError} />}
                      <input type="hidden" name="remember" value="true" />
                      <div className={s.inputGrid}>
                        <div className={s.inputGrid_Fname}>
                          <div className={s.inputGrid_label}>
                            <Label text="First Name" />
                          </div>
                          <FormInput
                            ariaLabel="First Name"
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                          />
                        </div>
                        <div className={s.inputGrid_Lname}>
                          <div className={s.inputGrid_label}>
                            <Label text="Last Name" />
                          </div>
                          <FormInput
                            ariaLabel="Last Name"
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                          />
                        </div>
                        <div className={s.inputGrid_Email}>
                          <div className={s.inputGrid_label}>
                            <Label text="Email address" />
                          </div>
                          <FormInput
                            ariaLabel="Email address"
                            name="email"
                            type="email"
                            placeholder="Email address"
                          />
                        </div>
                        <div className={s.inputGrid_Pass}>
                          <div className={s.inputGrid_label}>
                            <Label text="Password" />
                          </div>
                          <FormInput
                            ariaLabel="Password"
                            name="password"
                            type="password"
                            placeholder="Password"
                          />
                        </div>

                        <div className={s.submitBtnWrapper}>
                          <GradientButton type="submit" loading={loginLoading}>
                            Sign Up
                          </GradientButton>
                        </div>
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

export default Signup;
