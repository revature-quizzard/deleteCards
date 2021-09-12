import {Principal} from "../dtos/principal";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { Collections } from "../dtos/collection";
import { updateUnionTypeNode } from "typescript";
import { editCollection } from "../remote/collection-service";


interface IeditModal {
    current_user: Principal | undefined
    collection : Collections | undefined;
    show: boolean;
    setShow: (val: boolean) => void
    updateUI: (collection: Collections) => void
}

function editModal(props: IeditModal) {
    const handleClose = () => {
      props.setShow(false);
    }

    const update = () => {
      handleClose();
      if(props.collection?.id && props.current_user) {
       let title : string = props.collection.title;
       let category  : string = props.collection.category;
       let description : string  = props.collection.description;
       let token_  : string = props.current_user.token;
        editCollection({title, description , category} , token_ );
        //Tells main page to refresh the collections
        props.updateUI(props.collection);
      }
    }
    return (
        <>
          <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>"{props.collection?.title}"</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={update}>
                Apply
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}
export default editModal;