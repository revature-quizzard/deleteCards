import { useState, createElement } from 'react';
import { Link } from 'react-router-dom'

import {AppBar, Box, IconButton, List, ListItem, ListItemText, Grid, Container, Select, MenuItem, Toolbar, Typography, makeStyles} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faCog } from '@fortawesome/free-solid-svg-icons'
import { Principal } from "../dtos/principal";
import IconModal from "./icon-modals/IconModal";
import data from "../util/icons.json";
import * as FontAwesome from "react-icons/fa";
import * as Ionicons from "react-icons/io5";

interface INavbarProps {
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void,
    userIcon: string | undefined,
    setUserIcon: (icon: string | undefined) => void
}

const Icon = (props: any) => {
    const { project, iconName, size, color } = props;
    // console.log(`${project}[${iconName}]`)
    let icon;
    // Come back to later...having difficulty dynamically reading project
    if (project == 'FontAwesome') {
        //@ts-ignore
        icon = createElement(FontAwesome[iconName]);
    }
    else if (project == 'Ionicons') {
        //@ts-ignore
        icon = createElement(Ionicons[iconName]);
    }
    return <div style={{ fontSize: `${size}em`, color: color }}>{icon}</div>;
}

const useStyles = makeStyles({
    navbar: {
        paddingLeft: 100,
        paddingRight: 100
    },
    title: {
        fontSize: "1.6em",
        fontWeight: "bold",
        paddingLeft: 30,
        paddingRight: 30
    },
    link: {
        textDecoration: "none",
        fontSize: "1.5em",
        fontWeight: "bold",
        paddingLeft: 30,
        paddingRight: 30,
        WebkitTextFillColor: "gold",
        WebkitTextStrokeWidth: "1.5px",
        WebkitTextStrokeColor: "black"
    },
    leftSideLink: {
        textDecoration: "none",
        flexGrow: 1,
        WebkitTextFillColor: "white",
        WebkitTextStrokeWidth: "1px",
        WebkitTextStrokeColor: "black"
    },
    rightSideLink: {
        textDecoration: "none",
        color: "gold",
    },
    icon: {
        paddingBottom: 10
    },
    gear: {
        paddingBottom: 20
    }
})

export function NavbarComponent(props: INavbarProps){

    const classes = useStyles();

    const [showIconModal, setShowIconModal] = useState(false); 

    function logout() {
        props.setCurrentUser(undefined);
        sessionStorage.clear();
    }

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="primary" position="static" className={classes.navbar}>
                <Toolbar>
                    {
                        (props.currentUser)
                        ?
                        <>
                            {
                                // Display User Icon on left side of Navbar
                                data.map(({project, name, color}) => {
                                    // {console.log(project, name, color)}
                                    if(name == props.userIcon)
                                        return ( <div className={classes.icon}><Icon project={project} iconName={name} size={2.5} color={color} /></div> )
                                })
                            }
                            <Typography color="inherit" variant="h5" component="div" className={classes.title}>JASH</Typography>
                                <Typography color="inherit" variant="h6" className={classes.leftSideLink}>
                                    <Link to="/home" id="home" className={classes.link}>Home</Link>
                                </Typography>
                            
                            
                                <Typography color="inherit" variant="h6" className={classes.rightSideLink} onClick={logout}>
                                    <Link to="/" id="logout" className={classes.link}>Logout</Link>
                                </Typography>

                                <IconButton aria-label="Example" className={classes.gear} onClick={() => setShowIconModal(true)}>
                                    <Icon project={"FontAwesome"} iconName={"FaCog"} size={2} color={"#AFB1B2"} /> 
                                </IconButton>
                        </>
                        :
                        <>
                            <Typography color="inherit" variant="h5" component="div" className={classes.title}>JASH</Typography>
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