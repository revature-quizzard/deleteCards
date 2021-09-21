import {Principal} from "../../dtos/principal";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { Collections } from "../../dtos/collection";
import {deleteCollection} from "../../remote/collection-service";


interface ICollectionModal {
    current_user: Principal | undefined
    collection : Collections | undefined;
    show: boolean;
    setShow: (val: boolean) => void
    updateUI: (collection: Collections) => void
}
const buttonStyle = {
  backgroundColor: '#5f2568',
  border: '#5f2568',
  color: "gold",
}

function DeleteCollectionModal(props: ICollectionModal) {
    const handleClose = () => {
      props.setShow(false);
    }

    const remove = () => {
      handleClose();
      if(props.collection?.id && props.current_user) {
        console.log("DELETING")
        deleteCollection(props.collection?.id, props.current_user?.token);
        //Tells main page to refresh the collections
        props.updateUI(props.collection);
      }
    }
    return (
        <>
          <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete collection "{props.collection?.title}"</Modal.Body>
            <Modal.Footer>
              <Button style ={buttonStyle} variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button style ={buttonStyle} variant="primary" onClick={remove}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}
export default DeleteCollectionModal;