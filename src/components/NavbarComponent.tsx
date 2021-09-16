import { Link } from 'react-router-dom'

import {AppBar, List, ListItem, ListItemText, makeStyles, Toolbar, Typography} from "@material-ui/core";
import { Principal } from "../dtos/principal";

interface INavbarProps {
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

const useStyles = makeStyles({
    link: {
        textDecoration: "none",
        color: "white"
    }
})

export function NavbarComponent(props: INavbarProps){

    const classes = useStyles();

    function logout() {
        props.setCurrentUser(undefined);
    }

    return (
        <>
            <AppBar color="primary" position="static">
                <Toolbar>
                    <Typography variant="h5" color="inherit">
                        <List component="nav">
                            <ListItem component="div">
                                <Typography color="inherit" variant="h5">Navbar</Typography>
                                {
                                    props.currentUser
                                        ?
                                        <>
                                            <ListItemText inset>
                                                <Typography color="inherit" variant="h6">
                                                    <Link to="/home" id="home" className={classes.link}>Home</Link>
                                                </Typography>
                                            </ListItemText>
                                            <ListItemText inset>
                                                <Typography color="inherit" variant="h6" onClick={logout}>
                                                    <Link to="/" id="logout">Logout</Link>
                                                </Typography>
                                            </ListItemText>
                                        </>
                                        :
                                        <>
                                            <ListItemText inset>
                                                <Typography color="inherit" variant="h6">
                                                    <Link to="/login" id="login" className={classes.link}>Login</Link>
                                                </Typography>
                                            </ListItemText>
                                            <ListItemText inset>
                                                <Typography color="inherit" variant="h6">
                                                    <Link to="/register" id="register" className={classes.link}>Register</Link>
                                                </Typography>
                                            </ListItemText>
                                        </>
                                }
                            </ListItem>
                        </List>
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )


}