import {useState, useEffect} from "react";
import {Principal} from "../dtos/principal";
import { GameState } from "../dtos/game-state";
import {getSavedCollections} from "../remote/user-service";
import ErrorMessageComponent from "./ErrorMessageComponent";
import { Redirect , Link, withRouter, useHistory } from "react-router-dom";
import { Collections } from "../dtos/collection";
import { Alert, Card, InputGroup, Table, Button, FormControl } from "react-bootstrap";

import * as firestore from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import app from '../util/Firebase';
import { act } from "react-dom/test-utils";

const db = firestore.getFirestore(app);


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
    let [errorMessage, setErrorMessage] = useState('');
    let [gamesRef, setGamesRef] = useState(firestore.collection(db, 'games'))
    let [gameId, setGameId] = useState('');

    let history = useHistory();


    // game id = FsvUzbk9Ql4nhrEmrK1v

    useEffect(() => {
        const retrieveCollection = () => {
            firestore.onSnapshot(gamesRef, snapshot => {
                let games = snapshot.docChanges()
                games.forEach(async doc => {
                    // @ts-ignore
                    let _id = doc.doc.id;
                    let playersRef = firestore.collection(gamesRef, `${_id}/players`);
                    let playersArr = await getPlayers(gameId, playersRef);
                    console.log('Returned players array', playersArr);
                    // @ts-ignore
                    let temp = doc.doc['_document']['data']['value']['mapValue']['fields'];
                    if(!_id || !temp.name || !temp.capacity || !temp.match_state || !temp.question_index || !temp.question_timer || !temp.start_time || !temp.end_time) {
                        console.log("INVALID COLLECTION IN FIREBASE", temp);
                        return;
                    }
                    let newGame : GameState = {
                        id: _id,
                        name: temp.name.stringValue,
                        capacity: temp.capacity.integerValue,
                        match_state: temp.match_state,
                        question_index: temp.question_index,
                        question_timer: temp.question_timer,
                        start_time: temp.start_time.timestampValue,
                        end_time: temp.end_time.timestampValue,
                        players: playersArr,
                        questions: temp.questions
                    }
                    console.log(newGame)
                    setActiveGames(prevGames => [...prevGames, newGame])
                    console.log(activeGames)
                })
            })
          
        }
        retrieveCollection()
    }, [])

    // Get players from collections
    async function getPlayers(gameid: string, playersRef : firestore.CollectionReference<unknown>) {
        console.log('Players collection: ', await firestore.getDocs(playersRef));
        let game = activeGames?.find(g => {
            return g.id == gameid;
        })
        let gameplayers = await firestore.getDocs(playersRef)
        //@ts-ignore
        let playerarr = [];
        gameplayers.forEach(player => {
            //@ts-ignore
            playerarr.push(player['_document']['data']['value']['mapValue']['fields'])
        })

        //@ts-ignore
        return playerarr;
    }
    
    // This function is used for testing to spoof existence of active games
    function generateGames() {
        console.log('Generating games...')

        let test_game : GameState = {
            id: '1',
            name: 'Test Game',
            capacity: 10,
            match_state: 0,
            question_index: 0,
            question_timer: 10,
            start_time: new firestore.Timestamp(1, 1),
            end_time: new firestore.Timestamp(1, 1),
            players: [],
            questions: []
        }
    
        let test_list : GameState[] = [];
        test_list.push(test_game);
    
        // setActiveGames(test_list);
    }

    function joinGame(e: any) {
        console.log('Redirecting user to new game...');
        setErrorMessage('');

        // Pull game ID from state, and check to see if it is valid
        // Ensure gameID is not undefined first
        if (!gameId) return;
        let game = findGame(gameId);

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
                id: '1',
                name: 'Test Game',
                capacity: 10,
                match_state: 0,
                question_index: 0,
                question_timer: 10,
                start_time: new firestore.Timestamp(1, 1),
                end_time: new firestore.Timestamp(1, 1),
                players: [],
                questions: []
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
            {/* {console.log('Rerendered page. activeGames: ', activeGames)} */}
             <div>
               
             <br/><br/>
                {/* Prints all active games to the screen */}

                <Table  striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <td>Game ID</td>
                            <td>Name</td>
                            <td>Start Time</td>
                            <td>Capacity</td>
                            <td></td>
                        </tr>
                    </thead>                    
                    <tbody>
                        {/* {console.log(activeGames, activeGames[0])} */}
                        {/* @ts-ignore */}
                    {activeGames?.map((game, i) =>{ 
                        
                        return  <tr key={i} >
                                            {/* @ts-ignore */}
                                            <td>{game.id}</td>
                                            {/* @ts-ignore */}
                                            <td>{game.name}</td>
                                            {/* @ts-ignore */}
                                            <td>{game.start_time}</td>
                                            {/* @ts-ignore */}
                                            <td>{0 + '/' + game.capacity}</td>
                                            <td>
                                                <Link to="/game" className="btn btn-secondary" onClick={() => props.setCurrentGame(game)}>Join Game</Link>
                                            </td>
                                            </tr> 
                                    })}
                        {/* {console.log(activeGames, activeGames[0])} */}
                        {/* <tr>{activeGames[0].name}</tr> */}
                    </tbody>
                    
                </Table>
                {
                    (!activeGames)
                    ?
                        <>
                        
                        <Alert variant="warning">There are currently no active games!</Alert>
                        
                        </>                    
                    :
                        <>
                        </>
                }

                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Enter Game ID"
                    aria-label="Enter Game ID"
                    aria-describedby="basic-addon2"
                    id="direct-join-id"
                    onChange={e => setGameId(e.target.value)}
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

function GameListComponent(props: any) {
    console.log('Inside GameList');
    return (
    <tr>
        <td>props.name</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    )
}

export default JoinGameComponent;