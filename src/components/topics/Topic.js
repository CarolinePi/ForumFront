import React from 'react'
import {Link} from "react-router-dom";

const Topic = ({ topic }) => {
    return (
        <tr>
            <th scope="row">
                <Link to={'/topic/' + topic.id} key={topic.id}>
                    {topic.id}
                </Link>
            </th>
            <td>
                <Link to={'/topic/' + topic.id} key={topic.id}>
                    {topic.title}
                </Link>
            </td>
            <td>
                <Link to={'/topic/' + topic.id} key={topic.id}>
                    {topic.description}
                </Link>
            </td>
            <td>
                <Link to={'/topic/' + topic.id} key={topic.id}>
                    {topic.numberOfThreads}
                </Link>
            </td>
        </tr>
    );
}

export default Topic
