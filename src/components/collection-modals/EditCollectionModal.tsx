import {Principal} from "../../dtos/principal";
import {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import {editCollection} from "../../remote/collection-service";
import ErrorMessageComponent from "../ErrorMessageComponent";
import { Collections } from "../../dtos/collection";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

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

    function updateCategory(e : any , key : Number) {
      let temp = editedCollection;
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
      setEditedCollection(temp);
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
            <Modal.Body><input id="collection-title-input" type="text" defaultValue={props.collection?.title} onChange={updateCollectionTitle} placeholder="Title"/>
                <br/><br/>
              <DropdownButton as={ButtonGroup} key={1} id={`dropdown-variants-primary`} variant="primary" title= {editedCollection?.category}>
                <Dropdown.Item eventKey="1"  onClick={(e) => updateCategory(e , 1)}>Entertainment</Dropdown.Item>
                <Dropdown.Item eventKey="2"  onClick={(e) => updateCategory(e , 2)}>Education</Dropdown.Item>
                <Dropdown.Item eventKey="3"  onClick={(e) => updateCategory(e , 3)}>Food</Dropdown.Item>
                <Dropdown.Item eventKey="4"  onClick={(e) => updateCategory(e , 4)}>Love</Dropdown.Item>
                <Dropdown.Item eventKey="5"  onClick={(e) => updateCategory(e , 5)}>Misc</Dropdown.Item>
              </DropdownButton>
                 <br/><br/>
                <input id="collection-description-input" type="text" defaultValue={props.collection?.description} onChange={updateCollectionDescription} placeholder="Description"/></Modal.Body>
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