import {useState, useEffect} from "react";
import {Principal} from "../dtos/principal";
import {authenticate} from "../remote/auth-service";
import ErrorMessageComponent from "./ErrorMessageComponent";
import {Redirect} from "react-router-dom";
// import {Form, Button} from 'react-bootstrap';
import {Button, FormControl, Input, InputLabel, makeStyles, Typography} from "@material-ui/core";

interface ILoginProps {
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

const useStyles = makeStyles({
    loginContainer: {
        backgroundColor: "black",
        opacity: .94,
        justifyContent: "center",
        marginLeft: "25rem",
        marginTop: "10rem",
        padding: 20,
        width: "25%"
    },
    Input: {
        color: "white"
    }
});

const labelStyle = {
    color: "white"
}

function LoginComponent(props: ILoginProps) {
    const classes = useStyles();
    let [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            //@ts-ignore
            props.setCurrentUser(JSON.parse(sessionStorage.getItem('user')))
        }

    }, [])

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    async function login() {
        try {
            if (formData.username && formData.password) {
                let principal = await authenticate({username: formData.username, password: formData.password});
                props.setCurrentUser(principal);
                sessionStorage.setItem('user', JSON.stringify(principal));
            } else {
                setErrorMessage('You must provide a username and a password!');
            }
        } catch (e: any) {
            setErrorMessage(e.message);
        }
    }
    
    
    return(
        
        props.currentUser ? <Redirect to="/"/> :
        <>
            <div id="login-component" className={classes.loginContainer}>

            <Typography style= {{color: "gold"}} align="center" variant="h4">Please Log In to Your Account</Typography>

            <FormControl margin="normal" fullWidth>
            <h5 style= {{color: "gold"}}>Username</h5>                  
                <Input
                    onChange={handleChange}
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    style ={{backgroundColor: "white"}}
                />
            </FormControl>

            <FormControl margin="normal" fullWidth>
            <h5 style= {{color: "gold"}}>Password</h5>                  
                <Input
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    style ={{backgroundColor: "white"}}
                />
            </FormControl>

            <br/><br/>

            <Button
                id="login-button"
                onClick={login}
                variant="contained"
                color="primary"
                size="medium">Login</Button>

            <br/><br/>

            { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage} setErrorMessage={setErrorMessage}/> : <></> }
            </div>
        </>
    )
}

export default LoginComponent;