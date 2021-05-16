import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { FormGroup, Button, CardBody, Col, Row, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import { deleteUser } from '../../store/modules/auth/actions/authAction';
import Default from '../../Assets/default.png'
import  './Profile.css'
import Message from '../utils/Message';


import Navigation from "../Navigation"

const Profile = () => {

  const [modal, setModal] = useState(false);

  const toggle = (e) => {
    setModal(!modal);
  } 

  const currentUserState = useSelector((state) => state.Auth);
  
  const AuthID = currentUserState.currentUser ? currentUserState.currentUser.id : ""
  const authIsAdmin = currentUserState.currentUser ? currentUserState.currentUser.isAdmin : ""

  const dispatch = useDispatch()

  const deleteAccount = id => dispatch(deleteUser(id))

  let imagePreview = (<img className="img_style" src={Default} alt="profile"/>);

  //incase someone visits the route manually
  if(!currentUserState.isAuthenticated){
    return <Redirect to='/login' />
  }

  const shutDown = (e) => {
    e.preventDefault()
    deleteAccount(AuthID)
  }

  return (
    <Fragment>
      <Navigation />
      <div className="thread-style container">
        <div className="card-style">
          <div className="text-center">
            <h4>Profile</h4>
          </div>
          <Row className="mt-1">
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <FormGroup>
                { currentUserState.authSuccessImage != null && currentUserState.avatarError == null ? (
                  <Message msg={currentUserState.authSuccessImage} />
                  ) : (
                    ""
                )}
              </FormGroup>
            </Col>
          </Row>
          <CardBody>
            <div className="text-center mb-3">
                {imagePreview}
            </div>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
          <div style={{margin: "10px 0px 10px"}}>Username: <strong>{currentUserState.currentUser.userName}</strong></div>
          <div style={{margin: "10px 0px 10px"}}>Email: <strong>{currentUserState.currentUser.email}</strong></div>
          <div style={{margin: "10px 0px 10px"}}>Registration Date: <strong>{currentUserState.currentUser.registrationDate}</strong></div>
          </Col>
        </Row>
        { authIsAdmin ? (
          <Row className="mt-3">
            <Col sm="12" md={{ size: 10, offset: 1 }}>
              <FormGroup>
                <Button onClick={toggle}
                  color="danger"
                  type="submit"
                  block
                >
                Deactivate Account
                </Button>
              </FormGroup>
            </Col>
          </Row>
        ) : null}
        </CardBody>

        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="text-center">Are you sure you want to delete your account?</ModalHeader>
        <ModalBody toggle={toggle} className="text-center">This will also delete your threads if you created any.</ModalBody>
        <ModalFooter>
        { currentUserState.isLoading ? (
              <button className="btn btn-danger"
                disabled
              >
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
      </div>
    </div>
    
  </Fragment>
  )
}

export default Profile