import API_ROUTE from "../../../../apiRoute";
import axios from 'axios'
import {
  BEFORE_STATE_THREAD,
  FETCH_THREADS,
  FETCH_THREADS_ERROR,
  GET_THREAD_SUCCESS,
  GET_THREAD_ERROR,
  CREATE_THREAD_SUCCESS,
  CREATE_THREAD_ERROR,
  UPDATE_THREAD_SUCCESS,
  UPDATE_THREAD_ERROR,
  DELETE_THREAD_SUCCESS,
  DELETE_THREAD_ERROR,
  FETCH_AUTH_THREADS,
  FETCH_AUTH_THREADS_ERROR,
  DEACTIVATE_THREAD_SUCCESS, DEACTIVATE_THREAD_ERROR
} from '../threadsTypes'
import  {history} from '../../../../history'

 
export const fetchThreads = id => {


  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_THREAD })

    try {
      const res  = await axios.get(`${API_ROUTE}/topics/${id}/threads`)
      dispatch({ type: FETCH_THREADS, payload: res.data })
    } catch(err){
      dispatch({ type: FETCH_THREADS_ERROR, payload: err.response ? err.respons.data.error : "" })
    }
  }
}

export const fetchThread = id => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_THREAD })

    try {
      const res  = await axios.get(`${API_ROUTE}/Threads/${id}`)
      dispatch({ type: GET_THREAD_SUCCESS, payload: res.data })
    } catch(err){
      dispatch({ type: GET_THREAD_ERROR, payload: err.response.data.error })
      history.push('/'); //incase the user manually enter the param that dont exist
    }
  }
}

export const fetchAuthThreads = id => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_THREAD })

    try {
      const res  = await axios.get(`${API_ROUTE}/user_threads/${id}`)
      dispatch({ type: FETCH_AUTH_THREADS, payload: res.data.response })
    } catch(err){
      dispatch({ type: FETCH_AUTH_THREADS_ERROR, payload: err.response.data.error })
    }
  }
}

export const createThread = (createThread) => {
  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_THREAD })

    try {
      const res = await axios.post(`${API_ROUTE}/Threads`, createThread)
      dispatch({ 
        type: CREATE_THREAD_SUCCESS,  
        payload: res.data
      })
      history.push('/');
    } catch(err) {
      dispatch({ type: CREATE_THREAD_ERROR, payload: err.response.data.error })
    }
  }
}

export const updateThread = (updateDetails, updateSuccess) => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_THREAD })

    try {
      const res = await axios.put(`${API_ROUTE}/threads/${updateDetails.id}`, updateDetails)
      dispatch({ 
        type: UPDATE_THREAD_SUCCESS,
        payload: res.data
      })
      updateSuccess()
    } catch(err) {
      dispatch({ type: UPDATE_THREAD_ERROR, payload: err.response.data.error })
    }
  }
}

export const deleteThread = (id) => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_THREAD })

    try {
      const res = await axios.delete(`${API_ROUTE}/threads/${id}`)
      dispatch({ 
        type: DELETE_THREAD_SUCCESS,
        payload: {
          deletedID: id,
          message: res.data.response
        } 
      })
      history.push('/');
    } catch(err) {
      dispatch({ type: DELETE_THREAD_ERROR, payload: err.response.data.error })
    }
  }
}

export const deactivateThread = (id) => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE_THREAD })

    try {
      const res = await axios.put(`${API_ROUTE}/threads/deactivate/${id}`)
      let deleteMessage = res.data
      dispatch({
        type: DEACTIVATE_THREAD_SUCCESS, payload: deleteMessage
      })
      history.push('/');
    } catch(err) {
      dispatch({ type: DEACTIVATE_THREAD_ERROR, payload: err.response.data.error })
    }
  }
}



