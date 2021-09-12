import {Principal} from "../dtos/principal";
import {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { Collections } from "../dtos/collection";
import {createCollection} from "../remote/collection-service";
import ErrorMessageComponent from "./ErrorMessageComponent";
import { create } from "domain";
import { async } from "@firebase/util";

interface ICollectionModal {
    current_user: Principal | undefined
    show: boolean;
    setShow: (val: boolean) => void
    updateUI: (collection: Collections) => void
}

function CreateCollectionModal(props: ICollectionModal) {
    let [collection , setCollection] = useState({title:"", description:"", category:"", author:props.current_user} as Collections);
    let [errorMessage, setErrorMessage] = useState('');

    const handleClose = () => {
      props.setShow(false);
    }

    const create = async() => {
        if(props.current_user) {
            console.log("Creating")

            if(collection) {
                try {
                  await createCollection(collection, props.current_user.token);
                } catch(e : any) {
                  setErrorMessage(e.message);
                  console.log(e)
                  return
                }

                props.updateUI(collection);
                handleClose();

            }
          }
    }

    function updateTitle(e : any) {
        let temp = collection;
        if(temp) {
          temp.title = e.currentTarget.value;
        }
        setCollection(temp);
    }

    function updateCategory(e : any) {
      let temp = collection;
      if(temp) {
        temp.category = e.currentTarget.value;
      }
      setCollection(temp);
    }

    function updateDescription(e : any) {
      let temp = collection;
        if(temp) {
          temp.description = e.currentTarget.value;
        }
        setCollection(temp);
    }

    return (
        <>
          <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create New Collection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input id="title-input" type="text" onChange={updateTitle} placeholder="Title"/>
              <br/><br/>
              <input id="category-input" type="text" onChange={updateCategory} placeholder="Category"/>
              <br/><br/>
              <input id="description-input" type="text" onChange={updateDescription} placeholder="Description"/>
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
export default CreateCollectionModal;