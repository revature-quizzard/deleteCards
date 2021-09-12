import {useState, useEffect} from "react";
import {Principal} from "../dtos/principal";
import { GameState } from "../dtos/game-state";
import {getSavedCollections} from "../remote/user-service";
import ErrorMessageComponent from "./ErrorMessageComponent";
import { Redirect , Link } from "react-router-dom";
import { Collections } from "../dtos/collection";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Alert, Card } from "react-bootstrap";


interface IJoinGameProps {
    currentUser: Principal | undefined
}

/**
 *  We want the JoinGameComponent to:
 *      - display a list of all currently available games, ie games that are in an open lobby and not yet started
 *          + when games are created, they are stored in our Firebase Firestore realtime database, and should be pulled from there as well
 *          + games should not be displayed if they have already started, are private, or have no more room for players
 *      - provide a button next to open games to allow users to join that game
 *      - provide an entry field to directly join a game which the user has an id for
 *      - provide a back button to return to previous screen 
 */

function JoinGameComponent(props: IJoinGameProps) {

    // Current list of games in realtime database
    let [activeGames, setActiveGames] = useState([] as GameState[]);
    let [errorMessage, setErrorMessage] = useState('');

    // Set up firestore snapshot listener to get up to date active games
    useEffect(() => {
        
        return () => {
            // Unsubscribe from snapshot listener
        }
    }, [])
    
    return(
        !props.currentUser ? <Redirect to="/login"/> :
        <>
        
             <div>
               
             <br/><br/>
                {/* prints all user collections to the screen */}

                <Table  striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <td>Game ID</td>
                            <td>Name</td>
                            <td>Category</td>
                            <td>Capacity</td>
                        </tr>
                    </thead>                    
                    <tbody>
                    {activeGames?.map((game : GameState | undefined , i) =>{
                        
                        return  <tr key={i} >
                                            <td>{game?.id} </td>
                                            <td>{game?.name}</td>
                                            <td>{game?.category}</td>
                                            <td>{game?.capacity}</td>
                                            </tr> 
                                    })}
                    </tbody>
                    
                </Table>
                {
                    (activeGames.length == 0)
                    ?
                        <>
                        <Alert variant="warning">There are currently no active games!</Alert>
                        {console.log('no active games :(')}
                        </>
                    
                    :

                        console.log('there are active games')
                }

                
                { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }
            </div>
        </>
    )
}

export default JoinGameComponent;