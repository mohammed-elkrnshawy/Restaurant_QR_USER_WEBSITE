import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { useTranslation } from 'react-i18next';

const EditProfileModal = (props) => {
  const { t } = useTranslation();

  return (
    <Modal show={props.show} onHide={props.onHide} size="sm" centered>
      <Modal.Header closeButton={true}>
        <Modal.Title as="h5" id="edit-profile">
          {t('Edit Profile')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={props.handleSubmit}>
          <div className="form-row">
            <Form.Group className="col-md-12">
              <Form.Label>{t('Name')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={localStorage.getItem('name')}
              />
              <br />
            </Form.Group>
            <Form.Group className="col-md-12">
              <Form.Label>{t('Mobile Number')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={localStorage.getItem('phone')}
              />
              <br />
            </Form.Group>

            <Form.Group className="col-md-12">
              <Form.Label>{t('E-mail')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={localStorage.getItem('email')}
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
              {t('CANCEL')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="d-flex w-50 text-center justify-content-center"
            >
              {t('UPDTAE')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default EditProfileModal;
