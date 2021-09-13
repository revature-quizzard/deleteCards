import { Principal } from "../dtos/principal";
import { Redirect , Link } from "react-router-dom";




interface IHomeProps {
    currentUser: Principal | undefined;
}




function HomeComponent(props: IHomeProps) {
    return (
        props.currentUser
        ?
        <>
            <Link to="/join-game" className="btn btn-primary">Join Game</Link>
            <br/><br/>
            <Link to="/manage-collections" className="btn btn-primary">Manage Collection</Link>
            <br/><br/>
            <Link to="/" className="btn btn-primary">Create Game</Link>
            <br/><br/>
            <Link to="/custom-game" className="btn btn-primary">Custom Game (Testing)</Link>
            <br/><br/>
            <Link to="/discover" className="btn btn-primary">Discover</Link>
            <br/><br/>
        </>
        :
        <Redirect to="/login"/>
    )
}

export default HomeComponent;