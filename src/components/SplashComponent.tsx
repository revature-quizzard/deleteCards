import {AppBar, List, ListItem, ListItemText, makeStyles, Toolbar, Typography} from "@material-ui/core";
import { Link, Redirect } from 'react-router-dom'
import {useEffect} from 'react'
import {Principal} from '../dtos/principal'

interface ISplashProps{
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

const styles = {
    backgroundImage: "url(/splash.jpg)",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '125vh'
};

const linkStyle = {
    backgroundColor: '#5f2568',
    border: '#5f2568',
    color: "gold",
  };

  const locationStyle ={
  justifyContent: "center",
        marginLeft: "50rem",
        marginTop: "45rem",
    }

const useStyles = makeStyles({
    link: {
        backgroundColor: 'black',
        border: 'black',
        color: "gold",
    }

})
function SplashComponent(props: ISplashProps){
    const classes = useStyles();

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            //@ts-ignore
            props.setCurrentUser(JSON.parse(sessionStorage.getItem('user')))
        }

    }, [])
return (
    props.currentUser ? <Redirect to="/" /> :
    <>
    <div style={locationStyle}>
    <Link to="/register" style ={linkStyle} id="register" className="w-25 btn btn-primary">Register</Link>
    <br></br>
    <br></br>
    <Link to="/login" style ={linkStyle} id="login" className="w-25 btn btn-primary">Login</Link>
    </div>
    </>
)
}
export default SplashComponent;