import '../App.css';
import {useState, useEffect} from "react";
import {Principal} from "../dtos/principal";
import {registration} from "../remote/user-service";
import ErrorMessageComponent from "./ErrorMessageComponent";
import {Redirect} from "react-router-dom";
import {FormControl, Input, InputLabel, Button, Typography} from '@material-ui/core'

interface IRegisterProps {
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

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
    
    
    return(
        props.currentUser ? <Redirect to="/"/> :
        <>
            <div id="register-form">
            <Typography align="center" variant="h4">Register for a new account!</Typography>
            <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Enter your first name"
                    />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Enter your last name"
                    />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Enter your email address"
                    />
                </FormControl>


                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                    />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                    />
                </FormControl>

                <br/><br/>

                <Button
                    id="register-button"
                    onClick={register}
                    variant="contained"
                    color="primary"
                    size="medium">Register</Button>

                <br/><br/>
                { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage} setErrorMessage={setErrorMessage}/> : <></> }            </div>
        </>
    )
}

export default RegisterComponent;