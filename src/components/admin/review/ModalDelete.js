import React  from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalRemove = props => {
      return (
        <Modal show={props.open} onHide={props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Really Remove?</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={props.onChange}>
              Delete
            </Button>
    
            <Button variant="gray" onClick={props.onClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
    };
    
    export default ModalRemove;