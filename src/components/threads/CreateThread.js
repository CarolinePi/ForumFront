import React, { useState } from "react";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import "./Threads.css";
import Navigation from '../Navigation'
import { createThread } from '../../store/modules/threads/actions/threadsAction';



const CreateThread = (props) => {
  const topicID  = props.match.params.id

  const currentState = useSelector((state) => state);

  const [thread, setThread] = useState({
    title:'',
    content: '',
    userProfileId: 0,
    threadId: 0,
    repliedThreadId: null,
  });
  const dispatch = useDispatch()

  const addThread = (threadDetails) => dispatch(createThread(threadDetails))

  const handleChange = e => {
    setThread({
      ...thread,
      [e.target.name]: e.target.value
    })
  }
  const submitUser = (e) => {
    e.preventDefault()
    addThread({
      title: thread.title,
      content: thread.content,
      userProfileId: currentState.Auth.currentUser.id,
      topicID: topicID,
    });
  }

  if(!currentState.Auth.isAuthenticated){
    return <Redirect to='/login' />
  }
    return (
      <div>
        <div>
          <Navigation />
        </div>
        <div className="thread-style container App">
        <Card className="card-style">
          <CardHeader>Create Thread</CardHeader>
          <CardBody>
          <form onSubmit={submitUser}>
          <FormGroup>
            <Label>Title</Label>
            <Input type="text" name="title" placeholder="Enter title"  onChange={handleChange}/>
            { currentState.ThreadsState.threadsError && currentState.ThreadsState.threadsError.Required_title ? (
              <small className="color-red">{currentState.ThreadsState.threadsError.Required_title}</small>
              ) : (
                ""
              )}
              { currentState.ThreadsState.threadsError && currentState.ThreadsState.threadsError.Taken_title ? (
              <small className="color-red">{ currentState.ThreadsState.threadsError.Taken_title }</small>
              ) : (
                ""
              )}
          </FormGroup>
          <FormGroup>
            <Label>Content</Label>
            <Input type="textarea" cols="30" rows="6" name="content" id="" placeholder="Enter a short description" onChange={handleChange} />
            { currentState.ThreadsState.threadsError && currentState.ThreadsState.threadsError.Required_content ? (
              <small className="color-red">{currentState.ThreadsState.threadsError.Required_content}</small>
              ) : (
                ""
              )}
            </FormGroup>

            { currentState.ThreadsState.isLoading ? (
              <Button
                color="primary"
                type="submit"
                block
                disabled
              >
                Creating...
            </Button>
            ) : (
              <Button
                color="primary"
                type="submit"
                block
              >
              Create Thread
            </Button>
            )}
            </form>
            </CardBody>
          </Card>
        </div>
        </div>
    );
}

export default CreateThread
