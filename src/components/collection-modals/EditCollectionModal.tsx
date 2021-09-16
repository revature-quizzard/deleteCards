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

const buttonStyle = {
  backgroundColor: 'black',
  border: 'black',
  color: "gold",
}

function EditCollectionModal(props: IEditCollectionProps) { 
    let [editedCollection, setEditedCollection] = useState({
                                                            id: props.collection?.id,
                                                            title: props.collection?.title, 
                                                            description: props.collection?.description,
                                                            category: props.collection?.category,
                                                            author:props.collection?.author,
                                                            questionList:props.collection?.questionList
                                                            } as Collections);

    let [category, setCategory] = useState(props.collection?.category);
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
      setCategory(temp.category);
      setEditedCollection(temp);
    }

    function updateCollectionDescription(e: any){
        let temp = editedCollection;
        if (temp){
            temp.description = e.currentTarget.value;
            setEditedCollection(temp);
        };
    }

    const edit = async ()=> {
        if (editedCollection && props.current_user) {
          try {
              await editCollection(editedCollection, props.current_user.token);
          } catch(e : any) {
              setErrorMessage(e.message);
              return
          }
          props.updateUI(editedCollection)
          handleClose();       
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
              <DropdownButton as={ButtonGroup} key={1} id={`dropdown-variants-primary`} variant="dark" title= {category}>
                <Dropdown.Item eventKey="1"  onClick={(e) => updateCategory(e , 1)}>Entertainment</Dropdown.Item>
                <Dropdown.Item eventKey="2"  onClick={(e) => updateCategory(e , 2)}>Education</Dropdown.Item>
                <Dropdown.Item eventKey="3"  onClick={(e) => updateCategory(e , 3)}>Food</Dropdown.Item>
                <Dropdown.Item eventKey="4"  onClick={(e) => updateCategory(e , 4)}>Love</Dropdown.Item>
                <Dropdown.Item eventKey="5"  onClick={(e) => updateCategory(e , 5)}>Misc</Dropdown.Item>
              </DropdownButton>
                 <br/><br/>
                <input id="collection-description-input" type="text" defaultValue={props.collection?.description} onChange={updateCollectionDescription} placeholder="Description"/></Modal.Body>
            <Modal.Footer>
              <Button style = {buttonStyle} variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button style = {buttonStyle} variant="primary" onClick={edit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default EditCollectionModal;