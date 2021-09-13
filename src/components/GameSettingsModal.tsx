import {useState} from "react";
import {Principal} from "../dtos/principal";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import {GameSettings} from "../dtos/game-settings";


interface IGameSettingsModal {
    current_user: Principal | undefined
    currentGameSettings:  GameSettings | undefined,
    setCurrentGameSettings: (nextCollection: GameSettings | undefined) => void
    show: boolean;
    setShow: (val: boolean) => void
}

function GameSettingsModal(props: IGameSettingsModal) {
  let [matchTimer , setMatchTimer] = useState('');
  let [maxPlayers , setMaxPlayers] = useState('');
  let [category , setCategory] = useState('');
  let [name , setName] = useState('');
    const handleClose = () => {
      props.setShow(false);
    }

    function updateMaxPlayers(e: any) {
      setMaxPlayers(e.currentTarget.value);
  }

  function updateMatchTimer(e: any) {
    setMatchTimer(e.currentTarget.value);
  }

  function updateName(e: any) {
    setName(e.currentTarget.value);
}

function updateCategory(e: any) {
  setCategory(e.currentTarget.value);
}

    const update = () => {
      
      handleClose();
      if(props.currentGameSettings) {
      
      

      }
    }
    return (
        <>
          <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <input id="collection-name-input" type="text" onChange={updateMatchTimer} placeholder="Match Timer"/>
            <br/><br/>
            <input id="collection-name-input" type="text" onChange={updateMaxPlayers} placeholder="Max Players"/>
            <br/><br/>
            <input id="collection-name-input" type="text" onChange={updateCategory} placeholder="Category(Not decided)"/>
            <br/><br/>
            <input id="collection-name-input" type="text" onChange={updateName} placeholder="Name"/>
            <br/><br/>
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