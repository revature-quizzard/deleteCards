import {Principal} from "../dtos/principal";
import {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { Collections } from "../dtos/collection";

interface IEditCollectionProps {
    current_user: Principal | undefined
    show: boolean
    setShow: (val: boolean) => void
    updateUI: (collection: Collections) => void

}

function EditCollectionModal(props: IEditCollectionProps) {
    const handleClose = () => props.setShow(false);


    return (
        <>
          <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Oneday this will edit like a boss</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default EditCollectionModal;