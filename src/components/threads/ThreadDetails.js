import React, { useEffect } from 'react'
import Moment from 'react-moment';
import { useSelector, useDispatch } from "react-redux";
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

import Default from '../../Assets/default.png'
import { fetchThread } from '../../store/modules/threads/actions/threadsAction'
import Navigation from '../Navigation'
import Comments from '../comments/Comments'
import Comment from '../comments/Comment'
import EditThread from './EditThread';
import DeleteThread from './DeleteThread'



const ThreadDetails = (props) => {

  const threadID  = props.match.params.id

  const dispatch = useDispatch()

  const singleThread = id => dispatch(fetchThread(id))

  const currentState = useSelector(state => state)

  const thread = currentState.ThreadsState.thread

  const threadComments = currentState.CommentsState

  const authID = currentState.Auth.currentUser ? currentState.Auth.currentUser.id : ""
  let color = thread.isOpen ? 'success' : 'danger';

//Get the avatar of the author of the thread
  let imagePreview = null;
  let avatarPathThread = thread.author ? thread.author.avatar_path : null
  if(avatarPathThread){
    imagePreview = (<img className="img_style_thread" src={avatarPathThread} alt="profile"/>);
  } else {
    imagePreview = (<img className="img_style_thread" src={Default} alt="profile"/>);
  }


  useEffect(() => {
    singleThread(threadID)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let singleThreadComments = []

  if(threadComments){
    // eslint-disable-next-line array-callback-return
    threadComments.commentItems.map(eachItem => {
      if(eachItem.threadID === threadID){
        singleThreadComments = eachItem.comments
      } 
    }) 
  }

  return (
    <div id="page-container">
      <Navigation />
      <div className="container">
        <div className="mt-5 style-card">
          <Card outline color={color}>
            <CardBody style={{paddingBottom: "0px"}}>
            <CardTitle>
              <span>
                <span className="mr-2">
                  {imagePreview}
                </span>
                <span href="" style={{fontWeight: 'bold'}}>{thread.userProfile ? thread.userProfile.userName : ""}</span>
              </span>
              <span style={{float: 'right'}}>
                <Moment fromNow>{thread ? thread.threadOpenedDate : ""}</Moment>
              </span>
              </CardTitle>
              <CardTitle>{thread.title}</CardTitle>
              <CardText>{thread.content}</CardText>
              <div className="style-fav">
                <Comments threadID={threadID} isOpen={thread.isOpen} />
                { thread.userProfile && authID === thread.userProfile.id ? (
                <div className="ml-auto">
                  <span style={{marginRight: "20px"}}>
                    <EditThread thread={thread} />
                  </span>
                  <span>
                    <DeleteThread threadID={thread.id} />
                  </span>
                </div>
              ) : null}
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="mt-3 style-card-comment">
          {singleThreadComments ? singleThreadComments.map(comment => {
            return (
              <Comment comment={comment} key={comment.id} />
            )
          }) 
          : ""
          }
        </div>
      </div>
      
    </div>
  )
}

export default ThreadDetails