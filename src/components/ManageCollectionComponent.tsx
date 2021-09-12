import {useState, useEffect} from "react";
import {Principal} from "../dtos/principal";
import DeleteCollectionModal from "./DeleteCollectionModal";
import CreateCollectionModal from "./CreateCollectionModal";
import EditCollectionModal from "./EditCollectionModal";
import {Redirect} from "react-router-dom";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Collections } from "../dtos/collection";
import {getSavedCollections} from "../remote/user-service";

interface IManageProps {
    currentUser: Principal | undefined;
}

function ManageCollectionComponent(props: IManageProps) {
    let [collections , setCollections] = useState([] as Collections[]);
    let [errorMessage, setErrorMessage] = useState('');
    let [hasCollections, setHasCollections] = useState(false);
    let [showDelete, setShowDelete] = useState(false);
    let [showCreate, setShowCreate] = useState(false);
    let [showEdit, setShowEdit] = useState(false);
    let [currentCollection, setCurrentCollection] = useState(undefined as Collections | undefined);

    useEffect(() => {
        if(!hasCollections) {
            getCollection();
        }
    })

    async function getCollection() {    
        try {   
            if(props.currentUser) {
                setHasCollections(true);
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

    function edit(collection : Collections | undefined) {
        if(!collection) {
            return;
        }

        setShowEdit(true);
        setCurrentCollection(collection);
        return undefined;
    }

    function remove(collection : Collections | undefined) {
        if(!collection) {
            return;
        }

        setShowDelete(true);
        setCurrentCollection(collection);

        return undefined;
    }

    function removeUI(collection : Collections | undefined) {
        if(!collection) {
            return;
        }

        console.log(collection.id)
        let temp = collections;
        temp = temp.filter((c : Collections) => {
            return !(c.id === collection.id)
        })
        console.log(temp);
        setCollections(temp);
    }

    function createUI(collection : Collections | undefined) {
        if(!collection) {
            return;
        }

        console.log(collection.id)
        let temp = collections;
        temp.push(collection);
        console.log(temp);
        setCollections(temp);
    }

    async function create() {
        setShowCreate(true);
        return undefined;
    }

    function getComponent() {
        if(showDelete) {
            return <DeleteCollectionModal current_user={props.currentUser} collection={currentCollection} show={showDelete} setShow={setShowDelete} updateUI={removeUI}/>;
        } else if(showCreate) {
            return <CreateCollectionModal current_user={props.currentUser} show={showCreate} setShow={setShowCreate} updateUI={createUI}/>;
        } else if(showEdit){
            return <EditCollectionModal current_user={props.currentUser}  collection={currentCollection} show={showEdit} setShow={setShowEdit} updateUI={removeUI}/>;
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
                                    <td><Button variant="secondary" onClick={() => edit(C)}>Edit</Button> <Button variant="secondary" onClick={() => remove(C)}>Delete</Button></td>
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