import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import ReduxPromise from "redux-promise";
import Reducer from "./_reducers";

const store = applyMiddleware(ReduxPromise, ReduxThunk)(createStore);

ReactDOM.render(
    <Provider
    store={store( Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >      <App />
    </Provider>,
  document.getElementById("root")
);
//<React.StrictMode>