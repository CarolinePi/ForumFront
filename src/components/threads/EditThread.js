import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaPencilAlt } from 'react-icons/fa'
import {deactivateThread} from "../../store/modules/threads/actions/threadsAction";

const EditThread = ({ thread, className }) => {

  const [modal, setModal] = useState(false);

  const [threadUpdate, setThreadUpdate] = useState("")

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const deactThread = id => dispatch(deactivateThread(id))

  useEffect(() => {
    setThreadUpdate(thread)
  }, [thread]);

  const toggle = (e) => {
    e.preventDefault()
    setModal(!modal);
    setThreadUpdate(thread)
  }

  const handleChange = e => {
    setThreadUpdate({
      ...threadUpdate,
      [e.target.name]: e.target.value
    })
  }

  const shutDown = (e) => {
    e.preventDefault()
    deactThread(thread.id)
  }

  return (
    <span>
      <FaPencilAlt className="style-edit " onClick={toggle}/>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} className="text-center">Are you sure you want to deactivate thread?</ModalHeader>
        <ModalBody toggle={toggle} className="text-center">Users cant send new post.</ModalBody>
        <ModalFooter>
        { currentState.ThreadsState.isLoading ? (
            <button className="btn btn-danger" disabled>
              Deleting...
            </button>
        ) : (
            <button className="btn btn-danger"
                    onClick={shutDown}
                    type="submit"
            >
              Delete
            </button>
        )}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </span>
  );
}

export default EditThread;