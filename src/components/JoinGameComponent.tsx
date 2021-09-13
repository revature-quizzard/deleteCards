import {useState, useEffect} from "react";
import {Principal} from "../dtos/principal";
import { GameState } from "../dtos/game-state";
import {getSavedCollections} from "../remote/user-service";
import ErrorMessageComponent from "./ErrorMessageComponent";
import { Redirect , Link, withRouter, useHistory } from "react-router-dom";
import { Collections } from "../dtos/collection";
import { Alert, Card, InputGroup, Table, Button, FormControl } from "react-bootstrap";


interface IJoinGameProps {
    currentUser: Principal | undefined;
    currentGame: GameState | undefined;
    setCurrentGame: (game: GameState | undefined) => void;
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
    let [gameID, setGameID] = useState('');
    let [errorMessage, setErrorMessage] = useState('');
    let history = useHistory();

    // TODO Set up firestore snapshot listener to get up to date active games
    useEffect(() => {
        
        return () => {
            // Unsubscribe from snapshot listener
        }
    }, []);
    
    // This function is used for testing to spoof existence of active games
    function generateGames() {
        console.log('Generating games...')

        let test_game : GameState = {
            id: '1',
            name: 'Test Game',
            category: 'Testing',
            capacity: 10,
            players: []
        }
    
        let test_list : GameState[] = [];
        test_list.push(test_game);
    
        setActiveGames(test_list);
    }

    function joinGame(e: any) {
        console.log('Redirecting user to new game...');
        setErrorMessage('');

        // Pull game ID from state, and check to see if it is valid
        // Ensure gameID is not undefined first
        if (!gameID) return;
        let game = findGame(gameID);

        // If game is valid, redirect to lobby
        if (game) {
            console.log(game);
            props.setCurrentGame(game);
            history.push('/game');
            // <Redirect to="/game" />
        }

        else setErrorMessage('Game with given ID does not exist!');
        
    }

    function findGame(id : string) {
        // TODO Do firebase magic to return GameState object if it exists, or else undefined
        if (id == '111')
            return {
                id: '111',
                name: 'Test Game',
                category: 'Testing',
                capacity: 10,
                players: []
            }
        else return undefined;
    }
    

    /**
     *  Displays list of active games if any exist, with a join game button, otherwise displays message indicating that none exist.
     *  Displays search for direct game id and a join game button.
     */
    return(
        !props.currentUser ? <Redirect to="/login"/> :
        <>
        
             <div>
               
             <br/><br/>
                {/* Prints all active games to the screen */}

                <Table  striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <td>Game ID</td>
                            <td>Name</td>
                            <td>Category</td>
                            <td>Capacity</td>
                            <td></td>
                        </tr>
                    </thead>                    
                    <tbody>
                    {activeGames?.map((game : GameState, i) =>{
                        
                        return  <tr key={i} >
                                            <td>{game?.id} </td>
                                            <td>{game?.name}</td>
                                            <td>{game?.category}</td>
                                            <td>{game?.capacity}</td>
                                            <td>
                                                <Link to="/game" className="btn btn-secondary" onClick={() => props.setCurrentGame(game)}>Join Game</Link>
                                            </td>
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
                        <>{console.log('there are active games')}</>
                }

                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Enter Game ID"
                    aria-label="Enter Game ID"
                    aria-describedby="basic-addon2"
                    id="direct-join-id"
                    onChange={e => setGameID(e.target.value)}
                    />
                    <Button className="btn btn-primary" id="direct-join-game" onClick={joinGame}>
                    Join Game
                    </Button>
                </InputGroup>

                <Button variant="secondary" onClick={() => generateGames()}>Generate Games</Button>
                
                { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }
            </div>
        </>
    )
}

export default JoinGameComponent;