import * as types from "../constants/cart.constants";
import {
  LOGIN_SUCCESS,
  GOOGLE_LOGIN_SUCCESS,
  LOGOUT,
} from "../constants/user.constants";

const initialState = {
  loading: false,
  error: "",
  cartItemQty: 0,
  cartList: [],
  totalPrice: 0,
  selectedItem: {},
  cartItemCount: 0,
};

function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch(type){
    case LOGOUT: {
      return {...state, cartItemCount: 0};
    }
    case types.ADD_TO_CART_REQUEST:
    case types.GET_CART_LIST_REQUEST:
    case types.DELETE_CART_ITEM_REQUEST:
    case types.UPDATE_CART_ITEM_REQUEST:
    case types.GET_CART_QTY_REQUEST:
      return{...state, loading:true}

    case types.ADD_TO_CART_SUCCESS:
    case types.DELETE_CART_ITEM_SUCCESS:
      return {...state, loading: false, cartItemQty:payload}

    case types.UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartList: payload,
        totalPrice: payload.reduce(
          (total, item) => (total += item.productId.price * item.qty),0
        )
      };

    case types.GET_CART_LIST_SUCCESS:
      return {
        ...state, 
        loading: false,
        cartList: payload, 
        totalPrice: payload.reduce(
          (total, item) => (total += item.productId.price * item.qty),0
        )
      }

    case types.GET_CART_QTY_SUCCESS:
      console.log("리듀서",payload);
      return { ...state, cartItemCount: payload };

    case types.ADD_TO_CART_FAIL:
    case types.GET_CART_LIST_FAIL:
    case types.DELETE_CART_ITEM_FAIL:
    case types.UPDATE_CART_ITEM_FAIL:
    case types.GET_CART_QTY_FAIL:
      return {...state, loading:false, error:payload}
    default:
      return state
  }
}
export default cartReducer;
