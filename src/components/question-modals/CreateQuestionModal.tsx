import {Principal} from "../../dtos/principal";
import {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { Question } from "../../dtos/question";
import { Collections } from "../../dtos/collection";
import {createQuestion} from "../../remote/question-service";
import ErrorMessageComponent from "../ErrorMessageComponent";
import { create } from "domain";
import { async } from "@firebase/util";

interface IQuestionModal {
    current_user: Principal | undefined;
    current_collection: Collections | undefined;
    show: boolean;
    setShow: (val: boolean) => void
    updateUI: (question: Question | undefined) => void
}

function CreateQuestionModal(props: IQuestionModal) {
    let [question , setQuestion] = useState({question:"", collection_id: props.current_collection?.id, answer:"", category:"", value:""} as Question | undefined);
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

    function updateCategory(e : any) {
      let temp = question;
      if(temp) {
        temp.category = e.currentTarget.value;
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

    function updateDifficulty(e : any) {
        let temp = question;
          if(temp) {
            temp.value = e.currentTarget.value;
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
              <input id="question-input" type="text" onChange={updateQuestion} placeholder="Question"/>
              <br/><br/>
              <input id="answer-input" type="text" onChange={updateAnswer} placeholder="Answer"/>
              <br/><br/>
              <input id="category-input" type="text" onChange={updateCategory} placeholder="Category"/>
              <br/><br/>
              <input id="difficulty-input" type="text" onChange={updateDifficulty} placeholder="Difficulty"/>
              <br/><br/>
              { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }
            </Modal.Body>
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