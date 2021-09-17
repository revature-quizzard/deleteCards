import {Principal} from "../../dtos/principal";
import {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { Question } from "../../dtos/question";
import { Collections } from "../../dtos/collection";
import {createQuestion} from "../../remote/question-service";
import ErrorMessageComponent from "../ErrorMessageComponent";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { create } from "domain";
import { async } from "@firebase/util";

interface IQuestionModal {
    current_user: Principal | undefined;
    current_collection: Collections | undefined;
    show: boolean;
    setShow: (val: boolean) => void
    updateUI: (question: Question | undefined) => void
}

const buttonStyle = {
  backgroundColor: '#5f2568',
  border: '#5f2568',
  color: "lime",
}

function CreateQuestionModal(props: IQuestionModal) {
    let [question , setQuestion] = useState({question:"", collection_id: props.current_collection?.id, answer:"", category: props.current_collection?.category, value:""} as Question | undefined);
    let [errorMessage, setErrorMessage] = useState('');

    const handleClose = () => {
      props.setShow(false);
    }

    const create = async() => {
        if(props.current_user) {
            console.log("Creating")

            if(question) {
                try {
                    question = await createQuestion(question, props.current_user.token);
                } catch(e : any) {
                    setErrorMessage(e.message);
                    return
                }

                props.updateUI(question);
                handleClose();

            }
          }
    }

    function updateQuestion(e : any) {
        let temp = question;
        if(temp) {
          temp.question = e.currentTarget.value;
        }
        setQuestion(temp);
    }


    function updateAnswer(e : any) {
      let temp = question;
        if(temp) {
          temp.answer = e.currentTarget.value;
        }
        setQuestion(temp);
    }

    function updateDifficulty(e : any , key : Number) {
      let temp = question;
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
          setQuestion(temp);
      }

    return (
        <>
          <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create New Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input style = {{width:"420px"}} id="question-input" type="text" onChange={updateQuestion} placeholder="Question"/>
              <br/><br/>
              <input id="answer-input" type="text" onChange={updateAnswer} placeholder="Answer"/>
              <br/><br/>
              <p>Difficulty:</p>
              <DropdownButton as={ButtonGroup} style = {buttonStyle} key={1} id={`dropdown-variants-primary`} variant="primary" title= {question?.value}>
              <Dropdown.Item eventKey="1"  onClick={(e) => updateDifficulty(e , 1)}>1</Dropdown.Item>
                <Dropdown.Item eventKey="2"  onClick={(e) => updateDifficulty(e , 2)}>2</Dropdown.Item>
                <Dropdown.Item eventKey="3"  onClick={(e) => updateDifficulty(e , 3)}>3</Dropdown.Item>
                <Dropdown.Item eventKey="4"  onClick={(e) => updateDifficulty(e , 4)}>4</Dropdown.Item>
              </DropdownButton>
              <br/><br/>
              { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage} setErrorMessage={setErrorMessage}/> : <></> }            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={create}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}
export default CreateQuestionModal;