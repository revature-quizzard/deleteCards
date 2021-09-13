import {Principal} from "../../dtos/principal";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { Collections } from "../../dtos/collection";
import { Question } from "../../dtos/question";
import {deleteQuestion} from "../../remote/question-service";


interface ICollectionModal {
    current_user: Principal | undefined
    question : Question | undefined;
    show: boolean;
    setShow: (val: boolean) => void
    updateUI: (question: Question) => void
}

function DeleteQuestionModal(props: ICollectionModal) {
    const handleClose = () => {
      props.setShow(false);
    }

    const remove = () => {
      handleClose();
      if(props.question?.id && props.current_user) {
        console.log("DELETING")
        deleteQuestion(props.question?.id, props.current_user?.token);
        //Tells main page to refresh the collections
        props.updateUI(props.question);
      }
    }
    return (
        <>
          <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete this question?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={remove}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}
export default DeleteQuestionModal;

