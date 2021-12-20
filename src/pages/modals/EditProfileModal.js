import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import cogoToast from 'cogo-toast';
const EditProfileModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide} size="sm" centered>
      <Modal.Header closeButton={true}>
        <Modal.Title as="h5" id="edit-profile">
          Edit profile
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={props.handleSubmit}>
          <div className="form-row">
            <Form.Group className="col-md-12">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Phone number" />
              <br />
            </Form.Group>
            <Form.Group className="col-md-12">
              <Form.Label>Phone number</Form.Label>
              <Form.Control type="text" placeholder="Enter Phone number" />
              <br />
            </Form.Group>

            <Form.Group className="col-md-12">
              <Form.Label>Email id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email id
                        "
              />
            </Form.Group>
          </div>
          <Modal.Footer>
            <Button
              type="button"
              onClick={props.onHide}
              variant="outline-primary"
              className="d-flex w-50 text-center justify-content-center"
            >
              CANCEL
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="d-flex w-50 text-center justify-content-center"
            >
              UPDTAE
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default EditProfileModal;
