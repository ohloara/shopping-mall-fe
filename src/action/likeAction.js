import api from "../utils/api";
import * as types from "../constants/like.constants";

const likeAddRequest = (id, setIsLiked) => async (dispatch) => {
  try{
    dispatch({type:types.LIKE_ADD_REQUEST});
    const response = await api.post(`/like/${id}`);
    if(response.status !== 200) throw new Error(response.error);
    dispatch({type:types.LIKE_ADD_SUCCESS, payload:response.data});
    setIsLiked(true);
  }catch(error){
    dispatch({type:types.LIKE_ADD_FAIL, payload:error.message});
  }
};

const deleteAddRequest = (id, setIsLiked) => async (dispatch) => {
  try{
    dispatch({type:types.LIKE_DELETE_REQUEST});
    const response = await api.post(`/like/${id}`);
    if(response.status !== 200) throw new Error(response.error);
    dispatch({type:types.LIKE_DELETE_SUCCESS, payload:response.data});
    setIsLiked(false);
  }catch(error){
    dispatch({type:types.LIKE_ADD_FAIL, payload:error.message});
  }
};

const getLikeList = () => async (dispatch)=>{
  try{
    dispatch({type:types.LIKE_GET_REQUEST});
    const response = await api.get("/like");
    if(response.status !== 200) throw new Error(response.error);
    dispatch({type:types.LIKE_GET_SUCCESS, payload:response.data});
  }catch(error){
    dispatch({type:types.LIKE_GET_FAIL, payload:error.message});
  }
};   

export const likeActions = {
  likeAddRequest,
  deleteAddRequest,
  getLikeList,
};