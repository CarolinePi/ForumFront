import React from 'react'
import Moment from 'react-moment';
import { useSelector } from 'react-redux'
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

import './Threads.css';
import Default from '../../Assets/default.png'
import Comments from '../comments/Comments'
import EditThread from './EditThread';
import DeleteThread from './DeleteThread'
import {Link} from "react-router-dom";



const Thread = ({ thread }) => {

  const currentState = useSelector(state => state)
  const authID = currentState.Auth.currentUser ? currentState.Auth.currentUser.id : ""
  const authIsAdmin = currentState.Auth.currentUser ? currentState.Auth.currentUser.isAdmin : ""

  let $imagePreview = (<img className="img_style_thread" src={Default} alt="avatar"/>);
  let color = thread.isOpen ? 'success' : 'danger';

  return (
    <Card className="style-card-main" outline color={color}>
      <CardBody className="style-card-body">
      <CardTitle>
        <span>
          <span className="mr-2">
            <Link to={'/profile/' + thread.userProfile.id}>
              {$imagePreview}
            </Link>
          </span>
          {thread.userProfile ? (
              <span href="" style={{fontWeight: 'bold'}}>
                  <Link to={'/profile/' + thread.userProfile.id}>
                      {thread.userProfile.userName}
                  </Link>
              </span>
          ) : null}
        </span>
        <span style={{float: 'right'}}>
          <Moment fromNow>{thread.threadOpenedDate}</Moment>
        </span>
        </CardTitle>
        <CardTitle>{thread.title}</CardTitle>
        <CardText>{thread.content}</CardText>
        {console.log(thread)}
        <div className="style-fav">
            <>
              <Comments threadID={thread.id}  isOpen={thread.isOpen}/>
            </>
          { authID === thread.userProfile.id || authIsAdmin ? (
            <div className="ml-auto">
              <span style={{marginRight: "20px"}}>
                <EditThread thread={thread} />
              </span>
              <span>
                <DeleteThread threadID={thread.id} isOpen={thread.isOpen} />
              </span>
            </div>
          ) : ""}
        </div>
      </CardBody>
    </Card>
  )
}

export default Thread