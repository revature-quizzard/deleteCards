import {Principal} from "../dtos/principal";
import {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import {editCollection} from "../remote/collection-service";
import ErrorMessageComponent from "./ErrorMessageComponent";
import { Collections } from "../dtos/collection";

interface IEditCollectionProps {
    current_user: Principal | undefined
    collection: Collections | undefined
    show: boolean
    setShow: (val: boolean) => void
    updateUI: (collection: Collections) => void

}

function EditCollectionModal(props: IEditCollectionProps) { 
    let [editedCollection, setEditedCollection] = useState(props.collection);

    let [errorMessage, setErrorMessage] = useState('');

    const handleClose = () => props.setShow(false);

    function updateCollectionTitle(e: any){
        let temp = editedCollection;
        if (temp){
            temp.title = e.currentTarget.value;
            setEditedCollection(temp);
        };

    }

    function updateCollectionCategory(e: any){
        let temp = editedCollection;
        if (temp){
            temp.category = e.currentTarget.value;
            setEditedCollection(temp);
        };
    }

    function updateCollectionDescription(e: any){
        let temp = editedCollection;
        if (temp){
            temp.description = e.currentTarget.value;
            setEditedCollection(temp);
        };
    }

    const edit = ()=> {
        handleClose();
         if (editedCollection && props.current_user) {
                console.log("EDITING");
                editCollection(editedCollection, props.current_user.token); 
                
                //TODO UpdateUI
            } else {
                setErrorMessage('You must provide all fields!');
            }

    }

    return (
        <>
          <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body><input id="collection-title-input" type="text" onChange={updateCollectionTitle} placeholder="Title"/>
                <br/><br/>
                <input id="collection-category-input" type="text" onChange={updateCollectionCategory} placeholder="Category"/>
                 <br/><br/>
                <input id="collection-description-input" type="text" onChange={updateCollectionDescription} placeholder="Description"/></Modal.Body>
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

export default EditCollectionModal;