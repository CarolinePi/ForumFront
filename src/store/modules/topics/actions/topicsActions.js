import API_ROUTE from "../../../../apiRoute";
import axios from 'axios'
import { BEFORE_STATE_TOPIC, FETCH_TOPICS, FETCH_TOPICS_ERROR, GET_TOPIC_ERROR, GET_TOPIC_SUCCESS, CREATE_TOPIC_SUCCESS, CREATE_TOPIC_ERROR } from '../topicsTypes'
import {history} from "../../../../history";


export const fetchTopics = () => {


    return async (dispatch) => {

        dispatch({ type: BEFORE_STATE_TOPIC })

        try {
            const res  = await axios.get(`${API_ROUTE}/Topics`)
            dispatch({ type: FETCH_TOPICS, payload: res.data })
        } catch(err){
            dispatch({ type: FETCH_TOPICS_ERROR, payload: err.response ? err.respons.data.error : "" })
        }
    }
}

export const fetchTopic = id => {

    return async (dispatch) => {

        dispatch({ type: BEFORE_STATE_TOPIC })

        try {
            const res  = await axios.get(`${API_ROUTE}/Topics/${id}`)
            dispatch({ type: GET_TOPIC_SUCCESS, payload: res.data })
        } catch(err){
            dispatch({ type: GET_TOPIC_ERROR, payload: err.response.data.error })
            history.push('/'); //incase the user manually enter the param that dont exist
        }
    }
}

export const createTopic = (createTopic) => {
    return async (dispatch) => {

        dispatch({ type: BEFORE_STATE_TOPIC })

        try {
            const res = await axios.post(`${API_ROUTE}/Topics`, createTopic)
            dispatch({
                type: CREATE_TOPIC_SUCCESS,
                payload: res.data
            })
            history.push('/');
        } catch(err) {
            dispatch({ type: CREATE_TOPIC_ERROR, payload: err.response.data.error })
        }
    }
}


