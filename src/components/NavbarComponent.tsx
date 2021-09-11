import { Link } from 'react-router-dom'

import {Navbar, Container, Nav } from 'react-bootstrap';
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

    // return(
    //     <>
    //         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    //             <Container>
    //             {
    //                 props.currentUser
    //                 ?
    //                 <>
    //                 <Navbar.Brand href="home">Navbar</Navbar.Brand>
    //                 <Nav className="me-auto">
    //                 <Nav.Link href="home">Home</Nav.Link>
    //                 <Nav.Link href="logout" onClick={logout}>Logout</Nav.Link>
    //                 </Nav>
    //                 </>
    //                 :
    //                 <>
    //                 <Navbar.Brand href="home">Navbar</Navbar.Brand>
    //                 <Nav className="me-auto">
    //                 <Nav.Link href="login">Login</Nav.Link>
    //                 <Nav.Link href="register">Register</Nav.Link>
    //                 </Nav>
    //                 </>
    //             }
    //             </Container>
    //         </Navbar>
    //     </>
    // )

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
                                                    <Link to="/home" className={classes.link}>Home</Link>
                                                </Typography>
                                            </ListItemText>
                                            <ListItemText inset>
                                                <Typography color="inherit" variant="h6" onClick={logout}>Logout</Typography>
                                            </ListItemText>
                                        </>
                                        :
                                        <>
                                            <ListItemText inset>
                                                <Typography color="inherit" variant="h6">
                                                    <Link to="/login" className={classes.link}>Login</Link>
                                                </Typography>
                                            </ListItemText>
                                            <ListItemText inset>
                                                <Typography color="inherit" variant="h6">
                                                    <Link to="/register" className={classes.link}>Register</Link>
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