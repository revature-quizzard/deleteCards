import {Principal} from "../dtos/principal";
import {authenticate} from "../remote/auth-service";
import ErrorMessageComponent from "./ErrorMessageComponent";
import {Redirect} from "react-router-dom";
import { useState } from "react";
import { firebase } from "../initFirebase";
import { GameState } from "../dtos/game-state";
import { generate_game } from "../remote/generate-game";




interface IGameStarterProps {
    currentGame: GameState | undefined,
    setCurrentGame: (nextUser: GameState | undefined) => void
}

function GameStarterComponent(props: IGameStarterProps) {
    const [player1, setPlayer1] = useState("Player 1");
    const [player2, setPlayer2] = useState("Player 2");
    const [collection , setCollection] = useState("Genre")
    let [errorMessage, setErrorMessage] = useState('');

    function updatePlayer1(e: any) {
        setPlayer1(e.currentTarget.value);
    }

    function updatePlayer2(e: any) {
        setPlayer2(e.currentTarget.value);
    }

    

    async function StartGame() {



        try {
            if ((player2 && player2) && (player2 === player2)) {
                let gameState = await generate_game({player1, player2});
                props.setCurrentGame(gameState);
            } else {
                setErrorMessage('You must provide a username and a password!');
            }
        } catch (e: any) {
            setErrorMessage(e.message);
        }

        return (
            props.currentGame ? <Redirect to="/"/> :
        <>
            <div>
                <input id="username-input" type="text" onChange={updatePlayer2}/>
                <br/><br/>
                <input id="password-input" type="text" onChange={updatePlayer1}/>
                <br/><br/>

                <button id="GameStarter-btn" onClick={StartGame}>Start</button>
                <br/><br/>
                { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }
            </div>
        </>
        )
    }
    
    
    return(
        props.currentGame ? <Redirect to="/"/> :
        <>
            <div>
            <input id="username-input" type="text" onChange={updatePlayer2}/>
                <br/><br/>
                <input id="password-input" type="text" onChange={updatePlayer1}/>
                <br/><br/>
                <button id="GameStarter-btn" onClick={StartGame}>Start</button>
                <br/><br/>
                { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }
            </div>
        </>
    )
}

export default GameStarterComponent;