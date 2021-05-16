import API_ROUTE from "../../../../apiRoute";
import axios from 'axios'
import setAuthorizationToken  from "../../../../authorization/authorization";
import {
  BEFORE_STATE,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
} from '../authTypes'
import  {history} from '../../../../history'


export const SignIn = (credentials) => {
  return async (dispatch) => {
      dispatch({ type: BEFORE_STATE }) 
    try {
      const res = await axios.post(`${API_ROUTE}/Account/login`, credentials)
      let userData = res.data
      localStorage.setItem("token", userData.token)
      localStorage.setItem('user_data', JSON.stringify(userData.user));
      setAuthorizationToken(userData.token)
      dispatch({ type: LOGIN_SUCCESS, payload: userData })
    } catch(err) {
      dispatch({ type: LOGIN_ERROR, payload: err.response.data.error })
    }
  }
}

export const SignOut = () => {
  return (dispatch) => {
    localStorage.removeItem("token")
    setAuthorizationToken(false)
    dispatch({ type: LOGOUT_SUCCESS })
    window.localStorage.clear(); //update the localstorage
    history.push('/login');
  }
}

export const SignUp = (newUser) => {
    return async (dispatch) => {
        dispatch({ type: BEFORE_STATE }) 
      try {
        await axios.post(`${API_ROUTE}/Account/registration`, newUser);
        dispatch({ type: SIGNUP_SUCCESS })
        history.push('/login');
      } catch(err) {
        dispatch({ type: SIGNUP_ERROR, payload: err.response.data.error })
    }
  }
}

export const deleteUser = (id)  => {

  return async dispatch => {
    dispatch({ type: BEFORE_STATE })
    try {
      const res = await axios.put(`${API_ROUTE}/User/deactivate/${id}`);
      let deleteMessage = res.data
      dispatch({ type: DELETE_USER_SUCCESS, payload: deleteMessage })
      window.localStorage.clear(); //update the localstorage
      window.location.href = "/"
    } catch (err) {
      dispatch({ type: DELETE_USER_ERROR, payload: err.response.data.error })
    }
  }
}


export const ForgotPassword = (userEmail, clearInput) => {

  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE })
    
    try {
      const res = await axios.post(`${API_ROUTE}/password/forgot`, userEmail);
      let passwordRequest = res.data.response
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: passwordRequest })
      clearInput()
    } catch (err) {
      dispatch({ type: FORGOT_PASSWORD_ERROR, payload: err.response.data.error })
    }
  }
}

export const ResetPassword = (details, clearInput) => {

  return async (dispatch) => {
    
    dispatch({ type: BEFORE_STATE })

    try {
      const res = await axios.post(`${API_ROUTE}/password/reset`, details);
      let passwordRequest = res.data.response
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: passwordRequest })
      clearInput()
    } catch (err) {
      dispatch({ type: RESET_PASSWORD_ERROR, payload: err.response.data.error })
    }
  }
}

