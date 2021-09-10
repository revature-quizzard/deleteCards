import {useState, useEffect} from "react";
import {Principal} from "../dtos/principal";
import {authenticate} from "../remote/auth-service";
import ErrorMessageComponent from "./ErrorMessageComponent";
import DeleteCollectionModal from "./DeleteCollectionModal";
import {Redirect} from "react-router-dom";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Collections } from "../dtos/collection";
import {getSavedCollections} from "../remote/user-service";
import { isPropertySignature } from "typescript";

interface IManageProps {
    currentUser: Principal | undefined;
}

function ManageCollectionComponent(props: IManageProps) {
    let [collections , setCollections] = useState([]);
    let [errorMessage, setErrorMessage] = useState('');
    let [gotCollections, setGotCollections] = useState(false);
    let [showDelete, setShowDelete] = useState(false);
    let [currentCollection, setCurrentCollection] = useState("");

    useEffect(() => {
        if(collections.length == 0) {
            getCollection();
        }
    })

    async function getCollection() {    
        try {   
            if(!gotCollections && props.currentUser) {
                setGotCollections(true);
                //@ts-ignore
                let user_id = props.currentUser.id;
                let temp = await getSavedCollections( user_id, props.currentUser.token );
                if(temp) {
                    setCollections(temp);
                } else {
                    return;
                }
            }

        } catch (e: any) {
            setErrorMessage(e.message); 
        }

            
    }

    async function edit() {
        return;
    }

    function remove(collection_id : string | undefined) {
        if(!collection_id) {
            return;
        }

        setShowDelete(true);
        setCurrentCollection(collection_id);
        return undefined;
    }

    async function create() {
        return;
    }

    function getComponent() {
        if(showDelete) {
            return <DeleteCollectionModal current_user={props.currentUser} collection_id={currentCollection}/>;
        }
    }




    return (
        props.currentUser
        ?
        <>
            <Table  striped bordered hover variant="dark">
                    <thead>
                        <tr>
                          <td>Collection Title</td>
                          <td>Collection Category</td>
                          <td>Collection Description</td>
                          <td>Manage</td>
                        </tr>
                    </thead>
                    <tbody>
                    {collections?.map((C : Collections | undefined, i) =>{
                           
                        return  <tr key={i}>
                                    <td>{C?.title} </td>
                                    <td>{C?.category}</td>
                                    <td>{C?.description}</td>
                                    <td><Button variant="secondary" onClick={edit}>Edit</Button> <Button variant="secondary" onClick={() => remove(C?.id)}>Delete</Button></td>
                                </tr> 
                    })}
                    {getComponent()}
                    </tbody>
                </Table>

                <Button variant="secondary" onClick={create}>Create New Collection</Button>
                
        </>
        :
        <Redirect to="/login"/>
    )
}
export default ManageCollectionComponent;