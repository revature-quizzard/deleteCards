import {AppBar, List, ListItem, ListItemText, makeStyles, Toolbar, Typography} from "@material-ui/core";
import { Link } from 'react-router-dom'
interface ISplashProps{

}

const styles = {
    backgroundImage: "url(/splash.jpg)",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '125vh'
};

const useStyles = makeStyles({
    link: {
        backgroundColor: 'black',
        border: 'black',
        color: "gold",
    }
})
function SplashComponent(props: ISplashProps){
    const classes = useStyles();
return (
    <>
    <div>
    <Link to="/register" id="register" className={classes.link}>Register</Link>
    <Link to="/login" id="login" className={classes.link}>Login</Link>
    </div>
    </>
)
}
export default SplashComponent;