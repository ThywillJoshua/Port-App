import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.scss";
import Port from "./Port";
import PortProvider from "./context/PortContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PortProvider>
      <Port />
    </PortProvider>
  </React.StrictMode>
);
