import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import '../threads/Threads.css';
import { fetchComments } from '../../store/modules/comments/actions/commentsAction';
import CreateComment from './CreateComment'
import { history } from '../../history'




const Comments = ({ threadID, isOpen }) => {

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const authID = currentState.Auth.currentUser ? currentState.Auth.currentUser.id : ""

  const threadComments = currentState.CommentsState

  const getThreadComments = id => dispatch(fetchComments(id))

  let singleThreadComments = []

  if(threadComments){
    // eslint-disable-next-line array-callback-return
    threadComments.commentItems.map(eachItem => {
      if(eachItem.threadID === threadID){
        singleThreadComments = eachItem.comments  
      } 
    }) 
  }

  const noAuth = (e) => {
    e.preventDefault()
    history.push('/login');
  }

  useEffect(() => {
    getThreadComments(threadID);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let renderCreateComment = () => {
    if (!isOpen) {
      return null;
    } else if (authID) {
      return (
        <span className="mr-4">
          <span>
            <CreateComment threadID={threadID} />
          </span>
          <span className="ml-2">
            {singleThreadComments.length}
          </span>
        </span>
      );
    }
    return (
      <span className="mr-4">
        <span onClick={noAuth}>
         <CreateComment />
        </span>
        <span className="ml-2">
          {singleThreadComments.length}
        </span>
      </span>
    );
  }

  return (
    <div className="style-heart-outer">
      {renderCreateComment()}
    </div>
  )
}

export default Comments

