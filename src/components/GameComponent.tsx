import { Principal } from "../dtos/principal";
import { Alert, Button, Card, Carousel } from "react-bootstrap";
import { Redirect , Link, useLocation } from "react-router-dom";
import { GameState } from "../dtos/game-state";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";





interface IGameProps {
    currentUser: Principal | undefined;
    currentGame: GameState | undefined;
    setCurrentGame: (game: GameState | undefined) => void;

}
const useStyles= makeStyles({
    question : {
          backgroundColor : 'black',
          justifyContent : 'center',
          color : 'white',
          width : '35rem',
          height : '20rem',
        
          
    }
})

function GameComponent(props: IGameProps) {
    const classes = useStyles();
let [answer , setAnswer] = useState('');


function updateAnswer(e:any)
{
  setAnswer(e.target.value);
} 

function enterQuestion(e:any)
{
   if(answer)
   {

   }
}
    // let actualGame : GameState = location.state.currentGame;

    console.log('Inside GameComponent...');
    console.log(props);
    console.log(props.currentUser, props.currentGame);
    // console.log(props.location.state.currentGame);

    return (
        props.currentUser //&& props.currentGame
        ?
        <>
            <div id="div-for-question" className={classes.question}>
              <p>What the capital of uranus?</p>
             
            </div>
            <input id="password-input" type="text" onChange={updateAnswer}/>
            <Button className="btn btn-primary" id="direct-join-game" onClick={enterQuestion} title="enter">Enter</Button>
            <Alert variant="warning">{props.currentGame?.name}</Alert>
        </>
        :
        <Redirect to="/login"/>
    )
}

export default GameComponent;