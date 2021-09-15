import { Principal } from "../dtos/principal";
import { Alert, Button, Card, Carousel } from "react-bootstrap";
import { Redirect , Link, useLocation } from "react-router-dom";
import { GameState } from "../dtos/game-state";
import { useState } from "react";
import { Container } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import TextField, { TextFieldProps } from '@material-ui/core/TextField';





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

    console.log('Inside GameComponent...');
    console.log(props);
    console.log(props.currentUser, props.currentGameId);

    return (
        props.currentUser //&& props.currentGame
        ?
        <>
            <Container className={classes.questionAnswer}>
                <Container id="div-for-question" className={classes.question}>
                <p>What the capital of uranus?</p>
                
                </Container>
                <Container id="input-container" className={classes.input}>
                    <CssTextField id="answer-input" type="text"/>
                    <Button className="btn btn-primary" id="submit-answer" onClick={enterQuestion} title="enter">Answer</Button>
                </Container>
            </Container>
            
        </>
        :
        <Redirect to="/login"/>
    )
}

export default GameComponent;