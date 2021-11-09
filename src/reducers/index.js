import { combineReducers } from "redux";
import user from "./user_reducer";
import modelReducer from "./modelReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  user,
  modals:modelReducer,
  errors: errorReducer,
});

export default rootReducer;
