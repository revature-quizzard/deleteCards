import '../App.css';
import {useState, useEffect} from "react";
import {Principal} from "../dtos/principal";
import {registration} from "../remote/user-service";
import ErrorMessageComponent from "./ErrorMessageComponent";
import {Redirect} from "react-router-dom";
import {FormControl, Input, InputLabel, makeStyles, Button, Typography} from '@material-ui/core'

interface IRegisterProps {
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

const useStyles = makeStyles({
    RegisterContainer: {
        backgroundColor: "black",
        opacity: .94,
        justifyContent: "center",
        marginLeft: "10rem",
        marginTop: "5rem",
        width: "75%",
        height:"75%",
        borderRadius: "8em",
        border: "white",
    },
    Form: {
        width:"75%",
        marginLeft: "10em"
    },
}) 

function RegisterComponent(props: IRegisterProps) {

    let [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (formData.password !== formData.confirmPassword)
            setErrorMessage('Passwords must match!');
        else setErrorMessage('');
     }, [formData]);

    let handleChange = async (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});        
    }

    let validateUser = () => {
        setErrorMessage('');
        if (formData.username && formData.password && formData.email && formData.lastName && formData.firstName && formData.confirmPassword) {
            if (formData.password !== formData.confirmPassword) {
                setErrorMessage('Passwords must match!')
                return false;
            }
            return true;
        } else {
            setErrorMessage('Please fill in all fields.');
            return false;
        }
    }

    async function register() {
        try {
            if (validateUser()) {
                let principal = await registration(formData); 
                console.log(principal);
                props.setCurrentUser(principal);
            } else return;
        } catch (e: any) {
            setErrorMessage(e.message); 
        }

    }
    
    const classes = useStyles();

    return(
        props.currentUser ? <Redirect to="/"/> :
        <>
            <div id="register-form" className= {classes.RegisterContainer}>
            <br></br>
            <br></br>
            <Typography style= {{color: "gold"}} align="center" variant="h4">Register for a new account!</Typography>
            <FormControl margin="normal"  className={classes.Form}>
                    <InputLabel style= {{color: "white"}} htmlFor="firstName" >First Name</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Enter your first name"
                        style ={{backgroundColor: "white"}}
                    />
                </FormControl>

                <FormControl margin="normal"  className={classes.Form}>
                    <InputLabel style= {{color: "white"}} htmlFor="lastName">Last Name</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Enter your last name"
                        style ={{backgroundColor: "white"}}
                    />
                </FormControl>

                <FormControl margin="normal"  className={classes.Form}>
                    <InputLabel style= {{color: "white"}} htmlFor="email">Email Address</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Enter your email address"
                        style ={{backgroundColor: "white"}}
                    />
                </FormControl>


                <FormControl margin="normal"  className={classes.Form}>
                    <InputLabel style= {{color: "white"}} htmlFor="username">Username</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        style ={{backgroundColor: "white"}}
                    />
                </FormControl>

                <FormControl margin="normal"  className={classes.Form}>
                    <InputLabel style ={{color: "white"}} htmlFor="password">Password</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        style ={{backgroundColor: "white"}}
                    />
                </FormControl>
                <FormControl margin="normal"  className={classes.Form}>
                    <InputLabel style= {{color: "white"}} htmlFor="confirmPassword">Confirm Password</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        style ={{backgroundColor: "white"}}
                    />
                </FormControl>

                <br/><br/>

                <Button
                    id="register-button"
                    onClick={register}
                    variant="contained"
                    color="primary"
                    size="medium">Register
                </Button>

                <br/><br/>
                { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage} setErrorMessage={setErrorMessage}/> : <></> }            </div>
        </>
    )
}

export default RegisterComponent;