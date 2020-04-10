import React from "react";
import { Formik, Field, Form, useField, ErrorMessage } from "formik";
import * as Yup from "yup";

import Debug from "../Debug";

const defaultDelay = 1000;

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

const Schema = Yup.object().shape({
  login: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const FormikDemo = () => (
  <>
    <Formik
      initialValues={{ login: "", password: "" }}
      validationSchema={Schema}
      onSubmit={async (values) => {
        await delay(defaultDelay);
        alert(JSON.stringify(values, null, 2));
      }}
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

export default FormikDemo;
