import {useState} from "react";
import {Principal} from "../dtos/principal";
import {registration} from "../remote/user-service";
import ErrorMessageComponent from "./ErrorMessageComponent";
import {Redirect} from "react-router-dom";

interface IRegisterProps {
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

function RegisterComponent(props: IRegisterProps) {
    let [firstName , setFirstName] = useState('');
    let [lastName , setLastName] = useState('');
    let [username, setUsername] = useState(''); 
    let [email , setEmail] = useState('');
    let [password, setPassword] = useState('');

    let [errorMessage, setErrorMessage] = useState('');

    function updateUsername(e: any) {
        setUsername(e.currentTarget.value);
    }

    function updatePassword(e: any) {
        setPassword(e.currentTarget.value);
    }

    function updateEmail(e: any) {
        setEmail(e.currentTarget.value);
    }

    function updateFirstName(e: any) {
        setFirstName(e.currentTarget.value);
    }

    function updateLastName(e: any) {
        setLastName(e.currentTarget.value);
    }

    async function register() {
        try {
            if (username && password && email  && lastName && firstName) {
                let principal = await registration({username , password , firstName , lastName , email}); // user: {username: string, password: string , firstname: string , lastname: string ,  email: string })
                console.log(principal);
                props.setCurrentUser(principal);
            } else {
                setErrorMessage('You must provide all fields!');
            }
        } catch (e: any) {
            setErrorMessage(e.message); 
        }

    }
    
    
    return(
        props.currentUser ? <Redirect to="/"/> :
        <>
            <div>
                <input id="first-name-input" type="text" onChange={updateFirstName} placeholder="First Name"/>
                <br/><br/>
                <input id="last-name-input" type="text" onChange={updateLastName} placeholder="Last Name"/>
                 <br/><br/>
                <input id="username-input" type="text" onChange={updateUsername} placeholder="UserName"/>
                <br/><br/>
                <input id="email-input" type="text" onChange={updateEmail} placeholder="Email"/>
                <br/><br/>
                <input id="password-input" type="password" onChange={updatePassword} placeholder="Pa$$word"/>
                <br/><br/>
                <button id="register-btn" onClick={register}>Register</button>
                <br/><br/>
                { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }
            </div>
        </>
    )
}

export default RegisterComponent;