import { Principal } from "../dtos/principal";
import { Collections } from "../dtos/collection";
import { Redirect , Link } from "react-router-dom";




interface IViewProps {
    currentUser: Principal | undefined;
    collection: Collections | undefined;
}

function ViewCollectionComponent(props: IViewProps) {
    return (
        props.currentUser
        ?
        <>
            <h1>Manage "{props.collection?.title}" by {props.currentUser.username}</h1>
            <h6>Category: {props.collection?.category}</h6>
            <h6>Description: {props.collection?.description}</h6>
        </>
        :
        <Redirect to="/login"/>
    )
}

export default ViewCollectionComponent;