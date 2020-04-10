import styles from "./index.module.css";

import React from "react";
import { Formik, Form, useField, ErrorMessage } from "formik";
import * as Yup from "yup";

import Debug from "../Debug";

const defaultDelay = 3000;
const demoLogin = "demo@mail.ru";
const demoPassword = "12345678";
const requiredMsg = "Поле не заполнено";

const imitateRequest = async (data) => {
  await delay(defaultDelay);

  const errors = [];

  if (data.login !== demoLogin) {
    errors.push({ login: "Пользователь не существует" });
  }

  if (data.login === demoLogin && data.password !== demoPassword) {
    errors.push({ password: "Пароль неверный" });
  }

  return errors;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MyInput = (props) => {
  const [field] = useField(props);

  return <input {...field} {...props} />;
};

const Fieldset = ({ name, label, ...rest }) => (
  <span className={styles.fieldset}>
    <label className={styles.label} htmlFor={name}>
      {label}
    </label>
    <MyInput id={name} name={name} {...rest} />
    <ErrorMessage name={name}>
      {(msg) => <div className={styles.error}>{msg}</div>}
    </ErrorMessage>
  </span>
);

/**
 * Note that only first validation error will be shown.
 */
const Schema = Yup.object().shape({
  login: Yup.string().email("Неверный формат почты").required(requiredMsg),
  password: Yup.string().required(requiredMsg),
});

const FormikDemo = () => {
  /**
   * Read docs https://jaredpalmer.com/formik/docs/guides/form-submission
   */
  const submit = async (values, bag) => {
    const errors = await imitateRequest(values);
    if (errors.length === 0) {
      alert("Вход успешный, можно редиректить");
    } else {
      const collectedErrors = errors.reduce(
        (acc, cur) => ({ ...acc, ...cur }),
        {}
      );

      bag.setErrors(collectedErrors);
    }
  };

  return (
    <>
      <span className={styles.credentials}>
        <span>Демо учетка</span>
        <br />
        <span>{demoLogin}</span>
        <br />
        <span>{demoPassword}</span>
      </span>
      <p>Formik demo</p>
      <div className={styles.formikContainer}>
        <Formik
          initialValues={{ login: "", password: "" }}
          validationSchema={Schema}
          onSubmit={submit}
        >
          {(props) => (
            <Form className={styles.form}>
              <Fieldset name="login" label="Логин" placeholder="foo@bar.org" />
              <br />
              <Fieldset name="password" label="Пароль" />
              <br />
              <input className={styles.submit} type="submit" value="Войти" />
              <Debug {...props} />
              {props.isSubmitting && (
                <div className={styles.loader}>
                  <span>Loading...</span>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormikDemo;
