import React from "react";
import { Formik, Field, Form } from "formik";

import Debug from "../Debug";

const defaultDelay = 1000;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const FormikDemo = () => (
  <>
    <Formik
      initialValues={{ login: "", password: "" }}
      onSubmit={async (values) => {
        await delay(defaultDelay);
        alert(JSON.stringify(values, null, 2));
      }}
      render={(props) => (
        <Form>
          <label htmlFor="login">Логин</label>
          <Field name="login" placeholder="Login" />
          <br />
          <label htmlFor="login">Тоже логин</label>
          <Field name="login" placeholder="Login also">
            {({ field, form }) => (
              <>
                <span> ***</span>
                <input {...field} />
              </>
            )}
          </Field>
          <br />
          <label htmlFor="password">Пароль</label>
          <Field name="password" placeholder="Password" />
          <br />
          <input type="submit" value="Войти" />
          <Debug {...props} />
        </Form>
      )}
    />
  </>
);

export default FormikDemo;
