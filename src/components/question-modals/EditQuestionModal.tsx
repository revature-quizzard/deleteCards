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

const buttonStyle = {
  backgroundColor: 'black',
  border: 'black',
  color: "gold",
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

    function updateDifficulty(e : any , key : Number) {
      let temp = editedQuestion;
      if(temp) {
        if(key === 1)
        temp.value = "100";
        else if(key === 2)
        temp.value = "200";
        else if(key === 3)
        temp.value = "500";
        else if(key === 4)
        temp.value = "1000";
      }
          setEditedQuestion(temp);
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
                <input style = {{width:"420px"}} id="question-input" type="textarea" defaultValue={props.question?.question} onChange={updateQuestion} placeholder="Question"/>
                <br/><br/>
                <input id="answer-input" type="text" defaultValue={props.question?.answer} onChange={updateAnswer} placeholder="Title"/>
                <br/><br/>
                <p>Difficulty:</p>
              <DropdownButton as={ButtonGroup} key={1} id={`dropdown-variants-primary`} variant="dark" title= {props.question?.value}>
              <Dropdown.Item eventKey="1"  onClick={(e) => updateDifficulty(e , 1)}>1</Dropdown.Item>
                <Dropdown.Item eventKey="2"  onClick={(e) => updateDifficulty(e , 2)}>2</Dropdown.Item>
                <Dropdown.Item eventKey="3"  onClick={(e) => updateDifficulty(e , 3)}>3</Dropdown.Item>
                <Dropdown.Item eventKey="4"  onClick={(e) => updateDifficulty(e , 4)}>4</Dropdown.Item>
              </DropdownButton>
                <br/><br/>
                { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage} setErrorMessage={setErrorMessage}/> : <></> }            </Modal.Body>
            <Modal.Footer>
              <Button style ={buttonStyle} variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button style ={buttonStyle} variant="primary" onClick={edit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default EditQuestionModal;