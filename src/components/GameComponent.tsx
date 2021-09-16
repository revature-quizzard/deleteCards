import { Principal } from "../dtos/principal";
import { Alert, Button, Card, Carousel } from "react-bootstrap";
import { Redirect , Link, useLocation } from "react-router-dom";
import { GameState } from "../dtos/game-state";
import { useState, useEffect } from "react";
import { CardContent, Container, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { classicNameResolver } from "typescript";
import { Player } from "../dtos/player";
import { Collections } from "../dtos/collection";
import Timer from "../util/timer";
import '../GameComponent.css'

import * as firestore from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import app from '../util/Firebase';


const db = firestore.getFirestore(app);



interface IGameProps {
  currentUser: Principal | undefined;
  currentGameId : string | undefined;

}

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'green',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        },
      },
    },
  })(TextField);

const useStyles= makeStyles({
    question : {
        backgroundColor : 'black',
        justifyContent : 'center',
        color : 'white',
        width : '35rem',
        height : '20rem',
        border : '1em black',
        borderRadius : '2em' 
    },
    questionAnswer : {
        // backgroundColor : 'limegreen',
        width: '50%',
        border : '2em black',
        borderRadius : '2em' 
    },
    input : {
        paddingTop : '1em',
        marginLeft : '2em',
        marginRight : '2em'
    }

})

function GameComponent(props: IGameProps) {

    const classes = useStyles();
    let [game, setGame] = useState(undefined as GameState | undefined);
    let [gamesRef, setGamesRef] = useState(firestore.collection(db, 'games'))
    let [gameDocRef, setGameDocRef] = useState(firestore.doc(gamesRef, `dummy`))
    let [init, setInit] = useState(false);
    let [trigger, setTrigger] = useState(false);

    useEffect(() => {
      // console.log("HERE")
      if(props.currentGameId) {
        setGameDocRef(firestore.doc(gamesRef, `${props.currentGameId}`))
      } else {
        return;
      }
      console.log(props.currentGameId)
      const retrieveCollection = () => {
          firestore.onSnapshot(gameDocRef, async snapshot => {
            console.log('GAME CALLBACK');
              console.log('gameDocSnapshot: ', snapshot);
              let temp = await firestore.getDoc(firestore.doc(gamesRef, `${props.currentGameId}`))
              console.log('Game taken from snapshot:', temp);

              //@ts-ignore
              temp = temp['_document']['data']['value']['mapValue']['fields'];

              console.log('Temp now equal: ', temp);

              let playersRef = firestore.collection(gamesRef, `${props.currentGameId}/players`);
              //@ts-ignore
              let playersDocArr = await getPlayers(props.currentGameId, playersRef);
              let playersArr : Player[] = [];
              playersDocArr.forEach(player => {
                // console.log('Player:', player);
                playersArr.push(player);
              })
              console.log('Player array before set:', ...playersArr);

              let newGame : GameState = {
                id: props.currentGameId as string,
                //@ts-ignore
                name: temp.name.stringValue,
                //@ts-ignore
                capacity: temp.capacity.integerValue,
                //@ts-ignore
                match_state: temp.match_state.integerValue,
                //@ts-ignore
                question_index: temp.question_index.integerValue,
                //@ts-ignore
                question_timer: temp.question_timer.integerValue,
                //@ts-ignore
                start_time: temp.start_time.timestampValue,
                //@ts-ignore
                end_time: temp.end_time.timestampValue,
                //@ts-ignore
                host: temp.host.stringValue,
                //@ts-ignore
                players: playersArr,
                //@ts-ignore
                collection: temp.collection.mapValue.fields
            }

            console.log('NEW GAME: ', newGame);
            console.log('MATCH STATE', newGame.match_state);

            // setGame(undefined);
            setGame(newGame);
            console.log('HAHAHA JACK U R SO FUNNY HAHA HEHE')
            // setTrigger(!trigger);
            // setPlayers(playersArr);
            // console.log(players);
          })
        // console.log('GAME=', game);
      }
      retrieveCollection()
    }, [])

    // Get players from collections
    async function getPlayers(gameid: string, playersRef : firestore.CollectionReference<unknown>) {
        console.log('Players collection: ', await firestore.getDocs(playersRef));
        
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

    function checkInit() {
      if(!init) {
        setInit(true)
      }
    }

    async function startGame() {
      console.log("The game is starting right now!");
      await firestore.updateDoc(gameDocRef, 'match_state', 2);
      setTrigger(trigger => !trigger);
    }

    function onTimeout() {
      // console.log('The timer has run out');
      // if (game?.match_state == 2)
      //   firestore.updateDoc(gameDocRef, 'match_state', 1);
      // else if (game?.match_state == 1)
      // firestore.updateDoc(gameDocRef, 'match_state', 2);
      // setTrigger(trigger => !trigger);
    }

    /**
     *  We want to display a question field, an answer+submit field, and a list of players.
     *  Game States:
     *    - 0: Waiting to start
     *    - 1: Started, no questions
     *    - 2: Started, questions
     *    - 3: Ended
     */
    return (
        props.currentUser && props.currentGameId//&& props.currentGame
        ?
        <>
            
            {(game) ?
              <>
              {checkInit}
              {console.log('GAME RERENDER: ', game)}
              {console.log('Rerendered: ', props.currentGameId, game.match_state)}              
              {/* Player List */}
              {console.log('Players AND game in return line 187', game?.players, game)}
              <PlayersComponent key={true} players={game?.players} />

              {/* If game state changes to 2, start timer, set game state to 1 when timer ends */}
              {/* {
                (game.match_state == 1 || game.match_state == 2) ?
                  // <Timer initialMinute={0} initialSeconds={8} onTimeout={onTimeout} />
                  : <></>
              } */}
              {
                
                
                (game.match_state == 2) ?
                <>

                {/* Question and Answer */}
                <Container className={classes.questionAnswer}>
                    <Container id="div-for-question" className={classes.question}>
                    <h1>

                      </h1>
                    
                    </Container>
                    <Container id="input-container" className={classes.input}>
                        <CssTextField id="answer-input" type="text"/>
                        <Button className="btn btn-primary" id="submit-answer" title="enter">Answer</Button>
                    </Container>
                </Container>
                </>
                : <></>
              }

              {/* Host Capabilities */}
              {(props.currentUser.username === game?.host && game.match_state == 0)
              ?
                <>
                  <Button onClick={startGame}>
                    Start Game!
                  </Button>
                </>
              :
                <>
                
                </>
              }
              </>

            : <></>}
            
        </>
        :
        <>
        {console.log('REDIRECTING TO JOIN')}
        <Redirect to="/join-game"/>
        </>
    )
}

function QuestionComponent() {

}

function PlayersComponent(props: any) {

  const players : Player[] = props.players;

  return (
    <Container id="players-component">
      <Card>
        <CardContent>
          <Typography>
            Players
          </Typography>
        </CardContent>
      </Card>
      {players.map(function(player, i) {
        return <Card key={i}>
          <CardContent>
            <Typography>
              {/* @ts-ignore */}
              {player.name.stringValue}
            </Typography>
          </CardContent>
        </Card>
      })}
    </Container>
  )
}

export default GameComponent;