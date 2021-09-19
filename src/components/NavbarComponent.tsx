import { useState } from 'react';
import { Link } from 'react-router-dom'

import {AppBar, Box, IconButton, List, ListItem, ListItemText, Grid, Container, Select, MenuItem, Toolbar, Typography, makeStyles} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faCog } from '@fortawesome/free-solid-svg-icons'
import { Principal } from "../dtos/principal";
import IconModal from "./icon-modals/IconModal";

interface INavbarProps {
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void,
    userIcon: string | undefined,
    setUserIcon: (icon: string | undefined) => void
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
        // float: 'right',
        // paddingRight: 10 
    }
})

export function NavbarComponent(props: INavbarProps){

    const classes = useStyles();

    const [showIconModal, setShowIconModal] = useState(false); 

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

                                <IconButton aria-label="Example">
                                    <FontAwesomeIcon icon={faCog} onClick={() => setShowIconModal(true)}/>
                                </IconButton>
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
        <IconModal current_user={props.currentUser} userIcon={props.userIcon} setUserIcon={props.setUserIcon} show={showIconModal} setShow={setShowIconModal} />
        </>
    )


}