import API_ROUTE from "../../../../apiRoute";
import axios from 'axios'
import {  POST_CREATE_SUCCESS, POST_CREATE_ERROR, GET_POSTS_SUCCESS, GET_POSTS_ERROR, POST_DELETE_SUCCESS, POST_DELETE_ERROR, BEFORE_STATE_POST } from '../commentTypes'
import  {history} from '../../../../history'


export const fetchComments = id => {

  return async dispatch => {

    dispatch({ type: BEFORE_STATE_POST }) 

    try {
      const res = await axios.get(`${API_ROUTE}/threads/${id}/posts/`)
      dispatch({
        type: GET_POSTS_SUCCESS, 
        payload: {
          threadID: id,
          comments: res.data,
        }
      })
    } catch(err) {
      dispatch({ type: GET_POSTS_ERROR, payload: err.response.data.error })
    }
  }
}


export const createComment = (details, commentSuccess) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_POST }) 
    try {
      const res  = await axios.post(`${API_ROUTE}/posts`, details)
      dispatch({
        type: POST_CREATE_SUCCESS,
        payload: {
          threadID: details.threadId,
          comment: res.data,
        }
      })
      commentSuccess()
      history.push(`/threads/${details.threadId}`);
    } catch(err){
      dispatch({ type: POST_CREATE_ERROR, payload: err.response.data.error })
    }
  }
}

export const deleteComment = (details, deleteSuccess) => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_POST }) 

    try {
      await axios.delete(`${API_ROUTE}/posts/${details.id}`)
      dispatch({ 
        type: POST_DELETE_SUCCESS,
        payload: {
          id: details.id,
          threadID: details.threadID,
        } 
      })
      deleteSuccess()
    } catch(err) {
      dispatch({ type: POST_DELETE_ERROR, payload: err.response.data.error })
    }
  }
}
