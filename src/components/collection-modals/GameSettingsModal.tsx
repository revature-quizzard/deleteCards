import {useState} from "react";
import {Principal} from "../../dtos/principal";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import {GameSettings} from "../../dtos/game-settings";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { Collections } from "../../dtos/collection";


interface IGameSettingsModal {
    current_user: Principal | undefined
    currentGameSettings:  GameSettings | undefined,
    setCurrentGameSettings: (nextCollection: GameSettings | undefined) => void
    show: boolean;
    setShow: (val: boolean) => void
}

function GameSettingsModal(props: IGameSettingsModal) {
  let [matchTimer , setMatchTimer] = useState(Number);
  let [maxPlayers , setMaxPlayers] = useState(Number);
  let [category , setCategory] = useState('Category');
  let [name , setName] = useState('');
    const handleClose = () => {
      props.setShow(false);
    }
    

    function updateMaxPlayers(e: any) {
      setMaxPlayers(e.currentTarget.value);
  }

  function updateMatchTimer(e: any , eventKey : Number) {

    if(eventKey === 1)
    {
      setMatchTimer(30);
    }else if(eventKey === 2)
    {
      setMatchTimer(45);
    }else if(eventKey === 3)
    {
      setMatchTimer(60);
    }else
    {
      setMatchTimer(75);
    }
    console.log(matchTimer );
  }

  function updateName(e: any) {
    setName(e.currentTarget.value);
}



    const update = () => {
      
      handleClose();
        
      if(maxPlayers && matchTimer && props.currentGameSettings?.collection && category && name) {
      
        
        let collection : Collections | undefined = props.currentGameSettings?.collection;
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
            <DropdownButton as={ButtonGroup} key={1} id={`dropdown-variants-primary`} variant="primary" title= {`${"Match Time"} ${matchTimer} ${"(seconds)"} `}>
            <Dropdown.Item eventKey="1"  onClick={(e) => updateMatchTimer(e , 1)}>:30</Dropdown.Item>
            <Dropdown.Item eventKey="2"  onClick={(e) => updateMatchTimer(e , 2)}>:45</Dropdown.Item>
            <Dropdown.Item eventKey="3"  onClick={(e) => updateMatchTimer(e , 3)}>:60</Dropdown.Item>
            <Dropdown.Item eventKey="4"  onClick={(e) => updateMatchTimer(e , 4)}>:75</Dropdown.Item>
            </DropdownButton>
            <br/><br/>
            <input id="collection-name-input" type="text" onChange={updateMaxPlayers} placeholder="Max Players (20 Max)"/>
            <br/><br/>
            <input id="collection-name-input" type="text" onChange={updateName} placeholder="Name"/>
            
            <p> 
              <h5>Summery</h5>
              Collection : "{props.currentGameSettings?.collection?.title}"
              <br/><br/>
              Match time : {matchTimer} (seconds)
              <br/><br/>
              Category : {props.currentGameSettings?.collection?.category}
              <br/><br/>
              Max Players : {maxPlayers}
              <br/><br/>
              Name : {name}
              </p>
          
            <p>More Settings Comming Soon....</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={update}>
                Apply
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}
export default GameSettingsModal;