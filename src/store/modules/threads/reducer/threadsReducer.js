import { BEFORE_STATE_THREAD, FETCH_THREADS, FETCH_THREADS_ERROR, CREATE_THREAD_SUCCESS, UPDATE_THREAD_SUCCESS, CREATE_THREAD_ERROR, UPDATE_THREAD_ERROR, GET_THREAD_SUCCESS, GET_THREAD_ERROR, DELETE_THREAD_SUCCESS, DELETE_THREAD_ERROR, FETCH_AUTH_THREADS, FETCH_AUTH_THREADS_ERROR } from '../threadsTypes'

export const initState = {
  threads: [],
  authThreads: [],
  thread: {},
  threadsError: null,
  isLoading: false,
}

export const threadsState = (state = initState, action) => {

  const { payload, type } = action
  switch(type) {

    case BEFORE_STATE_THREAD:
      return {
        ...state,
        threadsError: null,
        isLoading: true,
      }
    case FETCH_THREADS:
      return { 
        ...state, 
        threads: payload,
        isLoading: false,
      }
      
    case FETCH_THREADS_ERROR:
      return { 
        ...state, 
        threadsError: payload,
        isLoading: false 
      }

    case FETCH_AUTH_THREADS:
      return { 
        ...state, 
        authThreads: payload,
        isLoading: false,
      }

    case FETCH_AUTH_THREADS_ERROR:
      return { 
        ...state, 
        threadsError: payload,
        isLoading: false 
      }

    case GET_THREAD_SUCCESS:
      return { 
        ...state, 
        thread: payload,
        threadsError: null,
        isLoading: false  
      }

    case GET_THREAD_ERROR:
      return { 
        ...state, 
        threadsError: payload,
        isLoading: false 
      }

    case CREATE_THREAD_SUCCESS:
      return { 
        ...state, 
        threads: [payload, ...state.threads],
        authThreads: [payload, ...state.authThreads],
        threadsError: null,
        isLoading: false  
      }

    case CREATE_THREAD_ERROR:
      return { 
        ...state, 
        threadsError: payload,
        isLoading: false  
      }

    case UPDATE_THREAD_SUCCESS:
      return { 
        ...state, 
        threads: state.threads.map(thread => 
          thread.id === payload.id ? 
          {...thread, title: payload.title, content: payload.content } : thread
        ),
        authThreads: state.authThreads.map(thread => 
          thread.id === payload.id ? 
          {...thread, title: payload.title, content: payload.content } : thread
        ),
        thread: payload,
        threadsError: null,
        isLoading: false 
      }

    case UPDATE_THREAD_ERROR:
      return { 
        ...state, 
        threadsError: payload,
        isLoading: false  
      }

     case DELETE_THREAD_SUCCESS:
      return { 
        ...state, 
        threads: state.threads.filter(thread => thread.id !== payload.deletedID),
        authThreads: state.authThreads.filter(thread => thread.id !== payload.deletedID),
        threadsError: null,
        isLoading: false   
      }

    case DELETE_THREAD_ERROR:
      return { 
        ...state, 
        threadsError: payload,
        isLoading: false  
      }

    default:
      return state
  }
}
