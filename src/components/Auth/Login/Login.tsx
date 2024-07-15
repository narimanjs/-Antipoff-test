// src/components/Auth/Login.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { login } from "../../../redux/actions/authActions";
import { RootState } from "../../../redux/store";
import styles from "./Login.module.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.header}>Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await dispatch(login(values)).unwrap();
              localStorage.setItem("token", response.token); // Store token
              navigate("/users");
            } catch (error) {
              console.error(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.inputField}>
                <Field
                  type='email'
                  name='email'
                  placeholder='Email'
                />
                <ErrorMessage
                  name='email'
                  component='div'
                  className={styles.errorMessage}
                />
              </div>
              <div className={styles.inputField}>
                <Field
                  type='password'
                  name='password'
                  placeholder='Password'
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  className={styles.errorMessage}
                />
              </div>
              <button
                type='submit'
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                Login
              </button>
              {auth.error && (
                <p className={styles.errorMessage}>{auth.error}</p>
              )}
            </Form>
          )}
        </Formik>
        <button
          onClick={() => navigate("/register")}
          className={styles.registerButton}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
