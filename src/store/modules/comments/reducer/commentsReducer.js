import { BEFORE_STATE_POST, POST_CREATE_SUCCESS, POST_CREATE_ERROR, GET_POSTS_SUCCESS, GET_POSTS_ERROR, POST_DELETE_SUCCESS, POST_DELETE_ERROR, POST_UPDATE_SUCCESS, POST_UPDATE_ERROR } from '../commentTypes'

export const initState = {
  commentItems : [],
  isLoading: false,
  commentSuccess: false
}


export const commentsState = (state = initState, action) => {
  
  const { payload, type }  = action;
  switch(type) {

    case BEFORE_STATE_POST:
      return {
        ...state,
        commentsError: null,
        isLoading: true,
        commentSuccess: false
      }

    case GET_POSTS_SUCCESS:
      return { 
        ...state, 
        commentItems: [...state.commentItems, { threadID: payload.threadID, comments: payload.comments  } ],
        isLoading: false,
        commentsError: null,
      }

    case GET_POSTS_ERROR:
      return { 
        ...state, 
        commentError: payload, 
        isLoading: false,
      }

    case POST_CREATE_SUCCESS:
      return { 
        ...state, 
        commentItems: state.commentItems.map(commentItem => 
                    Number(commentItem.threadID) === payload.threadID ? 
                    {...commentItem, comments: [payload.comment, ...commentItem.comments]} : commentItem
        ),
        message: "The comment is added",
        isLoading: false,
        commentSuccess: true
     }

    case POST_CREATE_ERROR:
      return { 
        ...state, 
        commentsError: payload, 
        isLoading: false,
        commentSuccess: false
      }

    case POST_UPDATE_SUCCESS:
      return { 
        ...state, 
        commentItems: state.commentItems.map(commentItem => 
          Number(commentItem.threadID) === payload.comment.thread_id ? 
          {...commentItem, comments: commentItem.comments.map(comment => comment.id === payload.comment.id  ? 
          {...comment, body: payload.comment.body } : comment  ) } : commentItem
        ),
        commentsError: null, 
        isLoading: false,
        commentSuccess: true,
      }

    case POST_UPDATE_ERROR:
      return { 
        ...state, 
        commentsError: payload, 
        isLoading: false,
        commentSuccess: false
      }

    case POST_DELETE_SUCCESS:
      return { 
        ...state, 
        commentItems: state.commentItems.map(commentItem => 
          Number(commentItem.threadID) === payload.threadID ? 
          {...commentItem, comments: commentItem.comments.filter(({id}) => id !== payload.id ) } : commentItem
        ),
        commentsError: null, 
        isLoading: false,
        commentSuccess: true,
      }

    case POST_DELETE_ERROR:
      return { 
        ...state, 
        commentsError: payload, 
        isLoading: false,
        commentSuccess: false
      }
    default:
      return state
  }
}

