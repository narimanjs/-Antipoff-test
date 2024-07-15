import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { register } from "../../../redux/actions/authActions";
import { RootState } from "../../../redux/store";
import styles from "./Register.module.css";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
});

const Register = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.header}>Регистрация</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={values => {
            dispatch(register(values));
          }}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.inputField}>
                <Field
                  type='text'
                  name='name'
                  placeholder='Name'
                />
                <ErrorMessage
                  name='name'
                  component='div'
                  className={styles.errorMessage}
                />
              </div>
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
              <div className={styles.inputField}>
                <Field
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm Password'
                />
                <ErrorMessage
                  name='confirmPassword'
                  component='div'
                  className={styles.errorMessage}
                />
              </div>
              <button
                type='submit'
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                Register
              </button>
              {auth.error && (
                <p className={styles.errorMessage}>{auth.error}</p>
              )}
            </Form>
          )}
        </Formik>
        <button
          onClick={() => navigate("/login")}
          className={styles.loginButton}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
