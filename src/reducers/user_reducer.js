/* eslint-disable import/no-anonymous-default-export */
import { LOGIN_USER, LOGOUT_USER } from "../actions/types";

const initialState = {
  userLoggedIn: false,
};

const booleanActionPayload = (payload) => {
  if (Object.keys(payload).length > 0) {
    return true;
  } else {
    return false;
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT_USER:
      return {
        userLoggedIn: booleanActionPayload(action.payload),
      };

    default:
      return state;
  }
}
