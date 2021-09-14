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
    let [gameID, setGameID] = useState('');
    let [dummy, setDummy] = useState('');
    let [errorMessage, setErrorMessage] = useState('');
    let history = useHistory();

    const gamesRef = firestore.collection(db, 'games');
    // game id = FsvUzbk9Ql4nhrEmrK1v

    let gameid;
    let playersRef: firestore.CollectionReference<unknown>;
    
    useEffect(() => {
        console.log('UseEffect activeGames', activeGames);
        setDummy('test');
        return () => {
            
        }
    }, [activeGames])

    // TODO Set up firestore snapshot listener to get up to date active games
    useEffect(() => {

        const unsub = firestore.onSnapshot((gamesRef),  (querySnapshot) => {
            console.log('Query snapshot: ', querySnapshot)
            // Every time collection updates, get list of players?
            let games : GameState[] = [];
             querySnapshot.docs.forEach(async (docu) => {

                console.log('Snapshot Document: \n', docu);

                gameid = docu['id'];
                playersRef = firestore.collection(gamesRef, `${gameid}/players`);
                let playersarr = await getPlayers(gameid, playersRef);
                console.log('Returned players array', playersarr);
                
                // @ts-ignore
                // console.log('Document info dug up: \n', docu['_document']['data']['value']['mapValue']['fields'])
                
                // @ts-ignore
                let newGame : GameState = docu['_document']['data']['value']['mapValue']['fields'];
                newGame.id = docu['id'];
                newGame.players = playersarr;
                console.log('Newly assigned game: \n', newGame);
                games.push(newGame);
            })
            // @ts-ignore
            // console.log(games[0]);
            //@ts-ignore
            // console.log(await games[0].start_time.timestampValue);
            console.log('Games before setGames', games);
            console.log('Active games before set: ', activeGames);
            setActiveGames(games);
            console.log('Active games after set: ', activeGames);
        })        
        
        return () => {
            console.log('Active games in return: ', activeGames);
            // Unsubscribe from snapshot listeners
            unsub();
            // unsub2();
        }
    }, []);

    // Get players from collections
    async function getPlayers(gameid: string, playersRef : firestore.CollectionReference<unknown>) {
        console.log('Players collection: ', await firestore.getDocs(playersRef));
        let game = activeGames.find(g => {
            return g.id == gameid;
        })
        let gameplayers = await firestore.getDocs(playersRef)
        //@ts-ignore
        let playerarr = [];
        gameplayers.forEach(player => {
            //@ts-ignore
            // console.log(player['_document']['data']['value']['mapValue']['fields'])
            //@ts-ignore
            playerarr.push(player['_document']['data']['value']['mapValue']['fields'])
        })
        //@ts-ignore
        // console.log('Players array', playerarr);
        //@ts-ignore
        // game.players = playerarr;
        // console.log('Game in array',game);
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
            {console.log('Rerendered page. activeGames: ', activeGames)}
            {console.log('And activeGames.length: ', activeGames.length)}
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
                        {console.log('active games before map + length: ', activeGames, activeGames.length)}
                        {/* @ts-ignore */}
                    {activeGames?.map((game, i) =>{ 
                        
                        return  <tr key={i} >
                                            {/* @ts-ignore */}
                                            <td>{game.id.stringValue}</td>
                                            {/* @ts-ignore */}
                                            <td>{game.name.stringValue}</td>
                                            {/* @ts-ignore */}
                                            <td>{game.start_time.timestampValue}</td>
                                            {/* @ts-ignore */}
                                            <td>{0 + '/' + game.capacity.integerValue}</td>
                                            <td>
                                                <Link to="/game" className="btn btn-secondary" onClick={() => props.setCurrentGame(game)}>Join Game</Link>
                                            </td>
                                            </tr> 
                                    })}
                        {/* {console.log(activeGames, activeGames[0])} */}
                        {/* <tr>{activeGames[0].name}</tr> */}
                                    {console.log('active games after map: ', activeGames)}
                    </tbody>
                    
                </Table>
                {
                    (!activeGames)
                    ?
                        <>
                        
                        <Alert variant="warning">There are currently no active games!</Alert>                        
                        {console.log('no active games :(', activeGames)}
                        
                        </>                    
                    :
                        <>
                        {console.log('activeGames length before', activeGames.length)}
                        {console.log('there are active games')}
                        {console.log(activeGames)}
                        {console.log('activeGames length after', activeGames.length)}</>
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