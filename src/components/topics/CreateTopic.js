import React, { useState } from "react";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import "./Topics.css";
import Navigation from '../Navigation'
import {createTopic} from "../../store/modules/topics/actions/topicsActions";


const CreateTopic = () => {

    const currentState = useSelector((state) => state);

    const [topic, setTopic] = useState({
        title:'',
        description: '',
    });
    const dispatch = useDispatch()

    const addTopic = (topicDetails) => dispatch(createTopic(topicDetails))

    const handleChange = e => {
        setTopic({
            ...topic,
            [e.target.name]: e.target.value
        })
    }
    const submitUser = (e) => {
        e.preventDefault()
        addTopic({
            title: topic.title,
            description: topic.description,
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
            <div className="topic-style container App">
                <Card className="card-style">
                    <CardHeader>Create Topic</CardHeader>
                    <CardBody>
                        <form onSubmit={submitUser}>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input type="text" name="title" placeholder="Enter title"  onChange={handleChange}/>
                                { currentState.TopicsState.topicsError && currentState.TopicsState.topicsError.Required_title ? (
                                    <small className="color-red">{currentState.TopicsState.topicsError.Required_title}</small>
                                ) : (
                                    ""
                                )}
                                { currentState.TopicsState.topicsError && currentState.TopicsState.topicsError.Taken_title ? (
                                    <small className="color-red">{ currentState.TopicsState.topicsError.Taken_title }</small>
                                ) : (
                                    ""
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input type="textarea" cols="30" rows="6" name="description" id="" placeholder="Enter a short description" onChange={handleChange} />
                                { currentState.TopicsState.topicsError && currentState.TopicsState.topicsError.Required_description ? (
                                    <small className="color-red">{currentState.TopicsState.topicsError.Required_description}</small>
                                ) : (
                                    ""
                                )}
                            </FormGroup>

                            { currentState.TopicsState.isLoading ? (
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
                                    Create Topic
                                </Button>
                            )}
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default CreateTopic
