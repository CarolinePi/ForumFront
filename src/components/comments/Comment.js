import React from 'react'
import Moment from 'react-moment';
import { useSelector } from 'react-redux'
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';

import '../threads/Threads.css';
import Default from '../../assets/default.png'
import DeleteComment from './DeleteComment'




const Comment = ({ comment }) => {

  const currentState = useSelector(state => state)
  const authID = currentState.Auth.currentUser.id
  const authIsAdmin = currentState.Auth.currentUser ? currentState.Auth.currentUser.isAdmin : ""

  let imagePreview = (<img className="img_style_thread" src={Default} alt="profile"/>);
  
  return (
    <div className="mt-3">
      <Card>
        <CardBody>
          <CardTitle>
            {comment.userProfile ?
            <span> 
              <span>
                <span className="mr-2">
                  {imagePreview}
                </span>
              <span href="" style={{fontWeight: 'bold'}}>{comment.userProfile.userName}</span>
              </span>
              <span style={{float: 'right'}}>
                <Moment fromNow>{comment.postDate}</Moment>
              </span>
              </span>
            : "" }
            </CardTitle>
            <CardText>{comment.content}</CardText>
          { authID === comment.userProfile.id && authIsAdmin ? (
              <div style={{float: "right"}}>
                <span>
                  <DeleteComment comment={comment} />
                </span>
              </div>
            ) : ""}
        </CardBody>
      </Card>
    </div>
  )
}

export default Comment