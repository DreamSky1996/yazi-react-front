/* eslint-disable import/no-anonymous-default-export */
import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_TO_SHOP,  
} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: action.payload };
    case GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShop: action.payload.products,
        toShopSize: action.payload.size,
      };
    default:
      return state;
  }
}
