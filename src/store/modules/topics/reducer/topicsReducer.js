import { BEFORE_STATE_TOPIC, FETCH_TOPICS, FETCH_TOPICS_ERROR, GET_TOPIC_SUCCESS, GET_TOPIC_ERROR } from '../topicsTypes'

export const initState = {
    topics: [],
    authThreads: [],
    topic: {},
    topicsError: null,
    isLoading: false,
}

export const topicsState = (state = initState, action) => {

    const { payload, type } = action
    switch(type) {

        case BEFORE_STATE_TOPIC:
            return {
                ...state,
                topicsError: null,
                isLoading: true,
            }
        case FETCH_TOPICS:
            return {
                ...state,
                topics: payload,
                isLoading: false,
            }

        case FETCH_TOPICS_ERROR:
            return {
                ...state,
                topicsError: payload,
                isLoading: false
            }

        case GET_TOPIC_SUCCESS:
            return {
                ...state,
                topic: payload,
                topicsError: null,
                isLoading: false
            }

        case GET_TOPIC_ERROR:
            return {
                ...state,
                topicsError: payload,
                isLoading: false
            }

        default:
            return state
    }
}
