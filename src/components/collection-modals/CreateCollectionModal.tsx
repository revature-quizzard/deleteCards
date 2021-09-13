import {Principal} from "../../dtos/principal";
import {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { Collections } from "../../dtos/collection";
import {createCollection} from "../../remote/collection-service";
import ErrorMessageComponent from "../ErrorMessageComponent";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

interface ICollectionModal {
    current_user: Principal | undefined
    show: boolean;
    setShow: (val: boolean) => void
    updateUI: (collection: Collections | undefined) => void
}

function CreateCollectionModal(props: ICollectionModal) {
    let [collection , setCollection] = useState({title:"", description:"", category:"", author:props.current_user} as Collections | undefined);
    let [errorMessage, setErrorMessage] = useState('');

    const handleClose = () => {
      props.setShow(false);
    }

    const create = async() => {
        if(props.current_user) {
            console.log("Creating")

            if(collection) {
                try {
                  collection = await createCollection(collection, props.current_user.token);
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

    function updateCategory(e : any , key : Number) {
      let temp = collection;
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
              <DropdownButton as={ButtonGroup} key={1} id={`dropdown-variants-primary`} variant="primary" title= {`${collection?.category}`}>
              <Dropdown.Item eventKey="1"  onClick={(e) => updateCategory(e , 1)}>Entertainment</Dropdown.Item>
                <Dropdown.Item eventKey="2"  onClick={(e) => updateCategory(e , 2)}>Education</Dropdown.Item>
                <Dropdown.Item eventKey="3"  onClick={(e) => updateCategory(e , 3)}>Food</Dropdown.Item>
                <Dropdown.Item eventKey="4"  onClick={(e) => updateCategory(e , 4)}>Love</Dropdown.Item>
                <Dropdown.Item eventKey="5"  onClick={(e) => updateCategory(e , 5)}>Misc</Dropdown.Item>
              </DropdownButton>
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