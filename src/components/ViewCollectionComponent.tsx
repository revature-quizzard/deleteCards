import { Principal } from "../dtos/principal";
import { Collections } from "../dtos/collection";
import { Redirect , Link } from "react-router-dom";
import {useState, useEffect} from "react";
import {getCollection} from "../remote/collection-service";




interface IViewProps {
    currentUser: Principal | undefined;
    collection: Collections | undefined;
    setCollection: (nextCollection: Collections | undefined) => void
}

function ViewCollectionComponent(props: IViewProps) {
    let [hasCollection, setHasCollection] = useState(false);
    let [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if(!hasCollection) {
            getCollectionWrapper();
        }
    })

    async function getCollectionWrapper() {    
        try {   
            if(props.currentUser) {
                setHasCollection(true);
                //@ts-ignore
                let collection_id = props.collection?.id
                let temp = undefined
                if(collection_id) {
                    temp = await getCollection( collection_id, props.currentUser.token );
                } else {
                    console.log("NO ID")
                }

                if(temp) {
                    props.setCollection(temp);
                } else {
                    return;
                }
                console.log(props.collection)
            }

        } catch (e: any) {
            setErrorMessage(e.message); 
        }

            
    }


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