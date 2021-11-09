/* eslint-disable import/no-anonymous-default-export */
import { MODAL_OPEN, MODAL_CLOSE } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case MODAL_OPEN:
      const { modalType, modalProps } = action.payload;
      return {...state, modalType, modalProps };
    case MODAL_CLOSE:
      return null;
    default:
      return state;
  }
}
