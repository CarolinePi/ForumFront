import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaRegComment } from 'react-icons/fa'

import { createComment } from '../../store/modules/comments/actions/commentsAction'

const CreateComment = ({ threadID, className }) => {

  const [modal, setModal] = useState(false);
  const [content, setContent] = useState("")

  const dispatch = useDispatch()

  const currentState = useSelector((state) => state);

  const addComment = details => dispatch(createComment(details, commentSuccess))

  const commentSuccess = () => {
    setModal(!modal);
  }

  const toggle = (e) => {
    e.preventDefault()
    setModal(!modal);
  } 

  const handleChange = e => {
    setContent(e.target.value)
  }

  const submitComment = (e) => {
    e.preventDefault()
    addComment({
      threadId: Number(threadID),
      userProfileId: currentState.Auth.currentUser.id,
      content
    })
  }

  return (
    <span>
      <FaRegComment className="style-heart " onClick={toggle}/>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Post</ModalHeader>
        <ModalBody>
          <textarea name="content" style={{ width: "100%", height: "150px" }} onChange={handleChange}></textarea>
          { currentState.CommentsState.commentsError && currentState.CommentsState.commentsError.Required_content ? (
              <small className="color-red">{currentState.CommentsState.commentsError.Required_content}</small>
              ) : (
                ""
              )}
        </ModalBody>
        <ModalFooter>
        { currentState.CommentsState.isLoading ? (
            <button className="btn btn-primary"
                disabled
            >
              Saving...
            </button>
            ) : (
            <button className="btn btn-primary"
              onClick={submitComment}
              type="submit"
            >
              New post
            </button>
            )}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </span>
  );
}

export default CreateComment;