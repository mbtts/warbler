import "./index.css";

import { BrowserRouter, Route } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";

import App from "./components/App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { apiMiddleware } from "./middleware/apiMiddleware";
import { checkSession } from "./actions/user";
import { logger } from "redux-logger";
import reducers from "./reducers";
import registerServiceWorker from "./registerServiceWorker";
import thunk from "redux-thunk";

const createMiddleware = () => {
  const middleware = [];
  if (process.env.NODE_ENV === "development") {
    middleware.push(logger);
  }
  middleware.push(apiMiddleware);
  middleware.push(thunk);

  return middleware;
};

const store = createStore(reducers, applyMiddleware(...createMiddleware()));
checkSession(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
