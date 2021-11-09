import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers";
import promiseMiddleware from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";

let store;

store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware, ReduxThunk))
);

export default store;
