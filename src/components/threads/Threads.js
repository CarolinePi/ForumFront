import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import './Threads.css';

import { fetchThreads } from '../../store/modules/threads/actions/threadsAction';
import Thread from './Thread'


const Threads = ({ topicID }) => {

  const threadsSelector = useSelector((state) => state.ThreadsState);
  const dispatch = useDispatch();

  // console.log("this is the thread state: ", threadsSelector)

  const getThreads = id => dispatch(fetchThreads(id));

  useEffect(() => {
    getThreads(topicID);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let threads = threadsSelector.threads.map((thread) => {
    return (
      <div className="mt-2 style-card" key={thread.id}>
         <Link to={'/threads/' + thread.id} key={thread.id}>
          <Thread thread={thread} key={thread.id} />
        </Link>
      </div>
    );
  })
  return (
    <div className="container">{threads}</div>
  )
}

export default Threads
