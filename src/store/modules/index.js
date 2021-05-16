import { combineReducers } from "redux"
import authReducer  from './auth/reducer/authReducer'
import { threadsState }  from "./threads/reducer/threadsReducer";
import { commentsState } from './comments/reducer/commentsReducer'
import { topicsState } from './topics/reducer/topicsReducer'


const reducer = combineReducers({
  Auth: authReducer,
  ThreadsState: threadsState,
  TopicsState: topicsState,
  CommentsState: commentsState
})

export default reducer

