import React from "react";
import { Formik, Form, useField, ErrorMessage } from "formik";
import * as Yup from "yup";

import Debug from "../Debug";

const defaultDelay = 1000;

const imitateRequest = async (data) => {
  await delay(defaultDelay);

  const errors = [];

  if (data.login !== "demo@mail.ru") {
    errors.push({ login: "Пользователь не существует" });
  }

  if (data.login === "demo@mail.ru" && data.password !== "12345678") {
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
  <>
    <label htmlFor={name}>{label}</label>
    <MyInput id={name} name={name} {...rest} />
    <ErrorMessage name={name} />
  </>
);

/**
 * Note that only first validation error will be shown.
 */
const Schema = Yup.object().shape({
  login: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
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
      <Formik
        initialValues={{ login: "", password: "" }}
        validationSchema={Schema}
        onSubmit={submit}
        render={(props) => (
          <Form>
            <Fieldset name="login" label="Логин" placeholder="foo@bar.org" />
            <br />
            <Fieldset name="password" label="Пароль" />
            <br />
            <input type="submit" value="Войти" />
            <Debug {...props} />
          </Form>
        )}
      />
    </>
  );
};

export default FormikDemo;
