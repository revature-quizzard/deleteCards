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
    let [answer , setAnswer] = useState('');
    let [players, setPlayers] = useState([] as Player[]);
    let [collection, setCollection] = useState({} as Collections);
    let [gamesRef, setGamesRef] = useState(firestore.collection(db, 'games'))
    let [gameDocRef, setGameDocRef] = useState(firestore.doc(gamesRef, `dummy`))
    let [init, setInit] = useState(false);

    useEffect(() => {
      console.log("HERE")
      if(props.currentGameId) {
        setGameDocRef(firestore.doc(gamesRef, `${props.currentGameId}`))
      } else {
        return;
      }
      console.log(props.currentGameId)
      const retrieveCollection = () => {
          firestore.onSnapshot(gameDocRef, async snapshot => {
              console.log('gameDocSnapshot: ', snapshot);

              let playersRef = firestore.collection(gamesRef, `${props.currentGameId}/players`);
              //@ts-ignore
              let playersDocArr = await getPlayers(props.currentGameId, playersRef);
              let playersArr : Player[] = [];
              playersDocArr.forEach(player => {
                console.log('Player:', player);
                playersArr.push(player);
              })
              console.log('Player array before set:', ...playersArr);
              //setActiveGames(prevGames => [...prevGames, newGame])
              setPlayers(playersArr);
              console.log(players);
          })
        
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

    /**
     *  We want to display a question field, an answer+submit field, and a list of players.
     */
    return (
        props.currentUser && props.currentGameId //&& props.currentGame
        ?
        <>
            {checkInit}
            {console.log('Rerendered: ', props.currentGameId, players)}
            {/* If game state changes to $, start timer, set game state to $ when timer ends */}
            <Timer key={0} initialMinute={0} initialSeconds={40} />
            {/* Player List */}
            {console.log('Players in return line 148', players)}
            <PlayersComponent key={1} players={players} />

            {/* Question and Answer */}
            <Container className={classes.questionAnswer}>
                <Container id="div-for-question" className={classes.question}>
                <p>What the capital of uranus?</p>
                
                </Container>
                <Container id="input-container" className={classes.input}>
                    <CssTextField id="answer-input" type="text"/>
                    <Button className="btn btn-primary" id="submit-answer" title="enter">Answer</Button>
                </Container>
            </Container>
            
        </>
        :
        <Redirect to="/join-game"/>
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