import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

// @ts-expect-error - grecaptcha is a global variable.
grecaptcha.ready(() => {
  const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
