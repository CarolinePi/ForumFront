import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchTopic} from "../../store/modules/topics/actions/topicsActions";
import Navigation from "../Navigation";
import {Table} from "reactstrap";
import Threads from "../threads/Threads";
import './Topics.css';
import {Link} from "react-router-dom";


const TopicDetails = (props) => {
    const topicID  = props.match.params.id

    const dispatch = useDispatch()

    const singleTopic = id => dispatch(fetchTopic(id))

    const currentState = useSelector(state => state)

    const topic = currentState.TopicsState.topic

    useEffect(() => {
        singleTopic(topicID)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id="page-container">
            <Navigation />

            <div className="mt-2 style-card">
                <Table striped>
                    <thead>
                    <tr>
                        <th>{topic.title}</th>
                        <th>{topic.description}</th>
                        <th><Link to={'/createthread/' + topic.id}>Create Thread</Link></th>
                    </tr>
                    </thead>
                </Table>
            </div>
            <div className="card-body">
                <Threads topicID={topicID} />
            </div>

        </div>
    )
}

export default TopicDetails