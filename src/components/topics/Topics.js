import {useDispatch, useSelector} from "react-redux";
import {fetchTopics} from "../../store/modules/topics/actions/topicsActions";
import React, {useEffect} from "react";
import Topic from './Topic'
import {Table} from "reactstrap";
import './Topics.css';

const Topics = () => {

    const topicsSelector = useSelector((state) => state.TopicsState);
    const dispatch = useDispatch();

    // console.log("this is the topic state: ", topicsSelector)

    const getTopics = () => dispatch(fetchTopics());

    useEffect(() => {
        getTopics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let topics = topicsSelector.topics.map((topic) => {
        return (
            <Topic topic={topic} key={topic.id} />
        );
    })
    return (
        <div className="mt-2 style-card">
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Topic</th>
                        <th>Description</th>
                        <th>Threads</th>
                    </tr>
                </thead>
                <tbody>
                    {topics}
                </tbody>
            </Table>
        </div>
    )
}

export default Topics