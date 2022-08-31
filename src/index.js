import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
