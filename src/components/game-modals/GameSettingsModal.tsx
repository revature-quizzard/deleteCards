import {useState} from "react";
import {Principal} from "../../dtos/principal";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import {GameSettings} from "../../dtos/game-settings";
import { Alert, ButtonGroup, Dropdown, DropdownButton, ListGroup } from "react-bootstrap";
import { Collections } from "../../dtos/collection";


interface IGameSettingsModal {
    current_user: Principal | undefined
    selectedCollection: Collections | undefined,
    currentGameSettings:  GameSettings | undefined,
    setCurrentGameSettings: (nextCollection: GameSettings | undefined) => void
    show: boolean;
    setShow: (val: boolean) => void
}

function GameSettingsModal(props: IGameSettingsModal) {
  let [matchTimer , setMatchTimer] = useState(30);
  let [maxPlayers , setMaxPlayers] = useState(0);
  let [category , setCategory] = useState('Category');
  let [name , setName] = useState('');
    
  const handleClose = () => {
      props.setShow(false);
  }
    

    function updateMaxPlayers(e: any) {
      setMaxPlayers(parseInt(e.currentTarget.value));
  }

  function updateMatchTimer(e: any , eventKey : Number) {

    if(eventKey === 1)
    {
      setMatchTimer(15);
    }else if(eventKey === 2)
    {
      setMatchTimer(30);
    }else if(eventKey === 3)
    {
      setMatchTimer(45);
    }else if( eventKey === 4)
    {
      setMatchTimer(60);
    }else{
      setMatchTimer(75);
    }
    console.log(matchTimer );
  }

  function updateName(e: any) {
    setName(e.currentTarget.value);
  }



    const update = () => {
      
      handleClose();
        
      if(maxPlayers && matchTimer && props.selectedCollection && category && name) {
      
        
        let collection : Collections | undefined = props.selectedCollection;
        console.log('Settings before set: ', props.currentGameSettings);
        props.setCurrentGameSettings({maxPlayers   , matchTimer , collection  , category  , name });
        
      }
    }
    return (
      
        <>
          <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <DropdownButton as={ButtonGroup} key={1} id={`dropdown-variants-primary`} variant="primary" title= {`${"Time Per Question"} ${matchTimer} ${"(seconds)"} `}>
            <Dropdown.Item eventKey="1"  onClick={(e) => updateMatchTimer(e , 1)}>:15</Dropdown.Item>
            <Dropdown.Item eventKey="2"  onClick={(e) => updateMatchTimer(e , 2)}>:30</Dropdown.Item>
            <Dropdown.Item eventKey="3"  onClick={(e) => updateMatchTimer(e , 3)}>:45</Dropdown.Item>
            <Dropdown.Item eventKey="4"  onClick={(e) => updateMatchTimer(e , 4)}>:60</Dropdown.Item>
            <Dropdown.Item eventKey="5"  onClick={(e) => updateMatchTimer(e , 5)}>:75</Dropdown.Item>
            </DropdownButton>
            <br/><br/>
            <input id="collection-name-input" type="text" onChange={updateMaxPlayers} placeholder="Max Players (20 Max)"/>
            <br/><br/>
            <input id="collection-name-input" type="text" onChange={updateName} placeholder="Name"/>
            
            <ListGroup>
              <ListGroup.Item ><h6>Summary</h6></ListGroup.Item>
              <ListGroup.Item variant="light">  Collection : "{props.selectedCollection?.title}"</ListGroup.Item>
              <ListGroup.Item variant="light"> Match time : {matchTimer} (seconds)</ListGroup.Item>
              <ListGroup.Item variant="light">Category : {props.selectedCollection?.category}</ListGroup.Item>
              <ListGroup.Item variant="light">Max Players : {maxPlayers}</ListGroup.Item>
              <ListGroup.Item variant="light"> Name : {name}</ListGroup.Item>
            </ListGroup>
       
            <p>More Settings Coming Soon....</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}> Cancel</Button>

             { matchTimer == 0
               ? 
              <Alert variant="warning">
               Set Match Time
              </Alert>
               :
              <Button variant="primary" onClick={update}>Apply</Button>} 
            </Modal.Footer>
          </Modal>
        </>
      );
}
export default GameSettingsModal;