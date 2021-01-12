import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ContextBody } from "./components/context";

ReactDOM.render(
  <React.StrictMode>
    <ContextBody>
      <App />
    </ContextBody>
  </React.StrictMode>,
  document.getElementById("root")
);
