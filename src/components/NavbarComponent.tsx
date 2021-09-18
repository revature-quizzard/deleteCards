import { Link } from 'react-router-dom'

import {AppBar, Box, List, ListItem, ListItemText, makeStyles, Toolbar, Typography} from "@material-ui/core";
import { Principal } from "../dtos/principal";

interface INavbarProps {
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

const useStyles = makeStyles({
    navbar: {
        paddingLeft: 100,
        paddingRight: 100
    },
    title: {
        paddingRight: 30
    },
    link: {
        textDecoration: "none",
        color: "gold"
    },
    leftSideLink: {
        textDecoration: "none",
        color: "gold",
        // paddingLeft: 10,
        flexGrow: 1
    },
    rightSideLink: {
        textDecoration: "none",
        color: "gold",
        float: 'right',
        // paddingRight: 10 
    }
})

export function NavbarComponent(props: INavbarProps){

    const classes = useStyles();

    function logout() {
        props.setCurrentUser(undefined);
    }

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="primary" position="static" className={classes.navbar}>
                <Toolbar>
                    <Typography color="inherit" variant="h5" component="div" className={classes.title}>JASH</Typography>
                    {
                        (props.currentUser)
                        ?
                        <>
                            
                                <Typography color="inherit" variant="h6" className={classes.leftSideLink}>
                                    <Link to="/home" id="home" className={classes.link}>Home</Link>
                                </Typography>
                            
                            
                                <Typography color="inherit" variant="h6" className={classes.rightSideLink} onClick={logout}>
                                    <Link to="/" id="logout" className={classes.link}>Logout</Link>
                                </Typography>
                            

                        </>
                        :
                        <>
                            
                                <Typography color="inherit" variant="h6">
                                    <Link to="/login" id="login" className={classes.link}>Login</Link>
                                </Typography>
                            
                            
                                <Typography color="inherit" variant="h6">
                                    <Link to="/register" id="register" className={classes.link}>Register</Link>
                                </Typography>
                            
                        </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
        </>
    )


}