import {Navbar, Container, Nav } from 'react-bootstrap';
import { Principal } from "../dtos/principal";

interface INavbarProps {
    currentUser: Principal | undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void
}

export function NavbarComponent(props: INavbarProps){

    function logout() {
        props.setCurrentUser(undefined);
    }

    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                {
                    props.currentUser
                    ?
                    <>
                    <Navbar.Brand href="home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                    <Nav.Link href="home">Home</Nav.Link>
                    <Nav.Link href="logout" onClick={logout}>Logout</Nav.Link>
                    </Nav>
                    </>
                    :
                    <>
                    <Navbar.Brand href="home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                    <Nav.Link href="login">Login</Nav.Link>
                    <Nav.Link href="register">Register</Nav.Link>
                    </Nav>
                    </>
                }
                </Container>
            </Navbar>
        </>
    )


}