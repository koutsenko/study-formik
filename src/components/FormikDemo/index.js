import React, { useState } from "react";

import Debug from "../Debug";

const defaultDelay = 1000;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const useFormik = (props) => {
  const [values, setValues] = useState(props.initialValues || {});

  const handleChange = (name) => (event) => {
    event.preventDefault();
    event.persist();

    setValues((oldValues) => ({
      ...oldValues,
      [name]: event.target.value,
    }));
  };

  return { values, handleChange };
};

const FormikDemo = () => {
  const { values, handleChange } = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    await delay(defaultDelay);
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Логин</label>
        <input
          type="text"
          value={values.login}
          onChange={handleChange("login")}
        />
        <br />
        <label>Пароль</label>
        <input
          type="text"
          value={values.password}
          onChange={handleChange("password")}
        />
        <br />
        <input type="submit" value="Войти" />
      </form>
      <Debug {...values} />
    </>
  );
};

export default FormikDemo;
