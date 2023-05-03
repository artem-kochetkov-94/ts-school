import React from "react";
import ReactDOM from "react-dom/client";
import { Users } from "./4-dummy-api";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Users />
  </React.StrictMode>
);
