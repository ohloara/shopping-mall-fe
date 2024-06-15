import * as types from "../constants/like.constants";

const initialState = {
  likeList : [],
  error: null
};

function likeReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.LIKE_ADD_REQUEST:
    case types.LIKE_DELETE_REQUEST:
        return {...state};
    case types.LIKE_ADD_SUCCESS:
    case types.LIKE_DELETE_SUCCESS:
        return {...state, likeList:[...state.likeList, payload]};
    case types.LIKE_ADD_FAIL:
    case types.LIKE_DELETE_FAIL:
        return {...state, error:payload};
    default:
      return state;
  }
}
export default likeReducer;
