import {Principal} from "../../dtos/principal";
import {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import {editQuestion} from "../../remote/question-service";
import ErrorMessageComponent from "../ErrorMessageComponent";
import { Collections } from "../../dtos/collection";
import { Question } from "../../dtos/question";
import { updateUnionTypeNode } from "typescript";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

interface IEditCollectionProps {
    current_user: Principal | undefined
    current_collection: Collections | undefined;
    question : Question | undefined;
    show: boolean
    setShow: (val: boolean) => void
    updateUI: (question: Question) => void

}

function EditQuestionModal(props: IEditCollectionProps) {
    let [errorMessage, setErrorMessage] = useState('');
    let [editedQuestion, setEditedQuestion] = useState({
                                                        id: props.question?.id,
                                                        question: props.question?.question, 
                                                        collection_id: props.current_collection?.id,
                                                        answer: props.question?.answer,
                                                        category:props.question?.category,
                                                        value:props.question?.value
                                                    } as Question);

    const handleClose = () => props.setShow(false);

    function updateQuestion(e: any){
        let temp = editedQuestion;
        if (temp){
            temp.question = e.currentTarget.value;
            setEditedQuestion(temp);
        };

    }

    function updateAnswer(e: any){
        let temp = editedQuestion;
        if (temp){
            temp.answer = e.currentTarget.value;
            setEditedQuestion(temp);
        };
    }

    function updateCategory(e : any , key : Number) {
        let temp = editedQuestion;
        if(temp) {
          if(key === 1)
          temp.category = "Entertainment";
          else if(key === 2)
          temp.category = "Education";
          else if(key === 3)
          temp.category = "Food";
          else if(key === 4)
          temp.category = "Love";
          else
          temp.category = "Misc";
        }
        setEditedQuestion(temp);
      }

    function updateDifficulty(e: any){
        let temp = editedQuestion;
        if (temp){
            temp.value = e.currentTarget.value;
            setEditedQuestion(temp);
        };
    }

    const edit = async()=> {
         if (editedQuestion && props.current_user) {
            try {
                await editQuestion(editedQuestion, props.current_user.token);
            } catch(e : any) {
                setErrorMessage(e.message);
                return
            }
            props.updateUI(editedQuestion)
            handleClose();       
        }
    }

    return (
        <>
          <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input id="question-input" type="text" defaultValue={props.question?.question} onChange={updateQuestion} placeholder="Question"/>
                <br/><br/>
                <input id="answer-input" type="text" defaultValue={props.question?.answer} onChange={updateAnswer} placeholder="Title"/>
                <br/><br/>
                <DropdownButton as={ButtonGroup} key={1} id={`dropdown-variants-primary`} variant="primary" title= {props.question?.category}>
              <Dropdown.Item eventKey="1"  onClick={(e) => updateCategory(e , 1)}>Entertainment</Dropdown.Item>
                <Dropdown.Item eventKey="2"  onClick={(e) => updateCategory(e , 2)}>Education</Dropdown.Item>
                <Dropdown.Item eventKey="3"  onClick={(e) => updateCategory(e , 3)}>Food</Dropdown.Item>
                <Dropdown.Item eventKey="4"  onClick={(e) => updateCategory(e , 4)}>Love</Dropdown.Item>
                <Dropdown.Item eventKey="5"  onClick={(e) => updateCategory(e , 5)}>Misc</Dropdown.Item>
              </DropdownButton>
                <br/><br/>
                <input id="difficulty-input" type="text" defaultValue={props.question?.value} onChange={updateDifficulty} placeholder="Difficulty"/>
                <br/><br/>
                { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={edit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default EditQuestionModal;