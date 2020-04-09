import React from "react";
import "./App.css";
import FormikDemo from "./components/FormikDemo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="form-container">
          <h4>Formik demo</h4>
          <FormikDemo />
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
