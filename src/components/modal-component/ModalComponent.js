import React, { useState } from 'react';
import './modal-component.css';
import { Button, Modal } from 'react-bootstrap';

const ModalComponent = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <Modal show={showModal}>
      {/* <Modal.Header>
        <h1>Error!</h1>
      </Modal.Header> */}
      <Modal.Body className='modal-body'>
        <h1>Can't add empty Task!</h1>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShowModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
