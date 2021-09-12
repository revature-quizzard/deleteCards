import { Principal } from "../dtos/principal";
import { Collections } from "../dtos/collection";
import { Question } from "../dtos/question";
import { Redirect , Link } from "react-router-dom";
import {useState, useEffect} from "react";
import {getCollection} from "../remote/collection-service";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'




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

    function edit(question : Question | undefined) {
        /*
        if(!collection) {
            return;
        }

        setShowEdit(true);
        setCurrentCollection(collection);
        return undefined;
        */
    }

    function remove(question : Question | undefined) {
        /*
        if(!collection) {
            return;
        }

        setShowDelete(true);
        setCurrentCollection(collection);

        return undefined;
        */
    }

    function getComponent() {
        /*
        if(showDelete) {
            return <DeleteCollectionModal current_user={props.currentUser} collection={currentCollection} show={showDelete} setShow={setShowDelete} updateUI={removeUI}/>;
        } else if(showCreate) {
            return <CreateCollectionModal current_user={props.currentUser} show={showCreate} setShow={setShowCreate} updateUI={createUI}/>;
        } else if(showEdit){
            return <EditCollectionModal current_user={props.currentUser}  collection={currentCollection} show={showEdit} setShow={setShowEdit} updateUI={removeUI}/>;
        }
        */
    }


    return (
        props.currentUser
        ?
        <>
            <h1>Manage "{props.collection?.title}" by {props.currentUser.username}</h1>
            <h6>Category: {props.collection?.category}</h6>
            <h6>Description: {props.collection?.description}</h6>
            <Table  striped bordered hover variant="dark">
                    <thead>
                        <tr>
                          <td>Question</td>
                          <td>Answer</td>
                          <td>Manage</td>
                        </tr>
                    </thead>
                    <tbody>
                    {props.collection?.questionList?.map((Q : Question | undefined, i) =>{
                           
                        return  <tr key={i}>
                                    <td>{Q?.question} </td>
                                    <td>{Q?.answer}</td>
                                    
                                    <td>
                                    <Button variant="secondary" onClick={() => edit(Q)}>Edit</Button> {  }
                                    <Button variant="secondary" onClick={() => remove(Q)}>Delete</Button> {  }
                                    </td>
                                </tr> 
                    })}
                    {getComponent()}
                    </tbody>
                </Table>
        </>
        :
        <Redirect to="/login"/>
    )
}

export default ViewCollectionComponent;