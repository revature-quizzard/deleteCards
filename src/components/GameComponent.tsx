import { Principal } from "../dtos/principal";
import { Alert } from "react-bootstrap";
import { Redirect , Link, useLocation } from "react-router-dom";
import { GameState } from "../dtos/game-state";




interface IGameProps {
    currentUser: Principal | undefined;
    currentGame: GameState | undefined;
    setCurrentGame: (game: GameState | undefined) => void;
}


function GameComponent(props: IGameProps) {

    // let actualGame : GameState = location.state.currentGame;

    console.log('Inside GameComponent...');
    console.log(props);
    console.log(props.currentUser, props.currentGame);
    // console.log(props.location.state.currentGame);

    return (
        props.currentUser && props.currentGame
        ?
        <>
            <Alert variant="warning">You are theoretically in a game right now!</Alert>
            <Alert variant="warning">{props.currentGame.name}</Alert>
        </>
        :
        <Redirect to="/login"/>
    )
}

export default GameComponent;