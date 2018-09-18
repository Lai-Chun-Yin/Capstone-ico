import "material-design-iconic-font/dist/css/material-design-iconic-font.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import configureStore from "./reduxStore";
import registerServiceWorker from "./registerServiceWorker";
import logger from "./services/logService";

const store = configureStore();

logger.init();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app-site") as HTMLElement
);

registerServiceWorker();
