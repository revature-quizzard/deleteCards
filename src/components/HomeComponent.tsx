import { Principal } from "../dtos/principal";
import { Redirect , Link } from "react-router-dom";
import {Button, FormControl, Input, InputLabel, makeStyles, Typography} from "@material-ui/core";


interface IHomeProps {
    currentUser: Principal | undefined;
}
const linkStyle = {
    backgroundColor: '#5f2568',
    border: '#5f2568',
    color: "lime",
  };

const useStyles = makeStyles({
    HomeContainer: {
        backgroundColor: "black",
        justifyContent: "center",
        marginLeft: "10rem",
        marginTop: "5rem",
        padding: 250,
        width: "75%",
        borderRadius: "8em",
        border: "white",
    },
     welcome: {
        color: ' #FFD93D',
        marginLeft: "15rem",
    }
});

function HomeComponent(props: IHomeProps) {
    const classes = useStyles();
    
    return (
        props.currentUser
        ?
        <>
            <div id = "home-component" className={classes.HomeContainer}>
            <h1 className = {classes.welcome}>Welcome {props.currentUser.username}!</h1>
            <br/><br/>
            <Link to="/join-game" style = {linkStyle} className="w-100 btn btn-primary">Join Game</Link>
            <br/><br/>
            <Link to="/manage-collections" style = {linkStyle} className="w-100 btn btn-primary">Manage Collection</Link>
            <br/><br/>
            <Link to="/" style = {linkStyle} className="w-100 btn btn-primary">Create Game</Link>
            <br/><br/>
            <Link to="/custom-game" style = {linkStyle} className="w-100 btn btn-primary">Custom Game (Testing)</Link>
            <br/><br/>
            </div>
        </>    
        :
        <Redirect to="/login"/>
    )
}

export default HomeComponent;