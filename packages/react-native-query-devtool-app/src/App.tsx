import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import QueryDevtool from "./pages/QueryDevtool";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryDevtool />
  </React.StrictMode>
);
