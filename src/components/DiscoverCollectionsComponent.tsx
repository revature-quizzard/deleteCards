import {useState, useEffect} from "react";
import {Principal} from "../dtos/principal";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Collections } from "../dtos/collection";
import {getAllCollections} from "../remote/collection-service";
import { Redirect , Link } from "react-router-dom";

interface IDiscoverProps {
    currentUser: Principal | undefined;
    setCurrCollection: (nextCollection: Collections | undefined) => void
}

function DiscoverCollectionsComponent(props: IDiscoverProps) {
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

    function favorite(collection : Collections | undefined) {

    }

    async function getCollection() {    
        try {   
            if(props.currentUser) {
                setHasCollections(true);
                //@ts-ignore
                let user_id = props.currentUser.id;
                let temp = await getAllCollections(props.currentUser.token );
                if(temp) {
                    temp = temp.filter((c : Collections) => {
                        return (c.author.username != props.currentUser?.username)
                    })
                    setCollections(temp);
                } else {
                    return;
                }
            }

        } catch (e: any) {
            setErrorMessage(e.message); 
        }   
    }

    return (
        props.currentUser
        ?
        <>
            <h1>Discover Collections</h1>
            <Table  striped bordered hover variant="dark">
                    <thead>
                        <tr>
                          <td>Collection Title</td>
                          <td>Collection Category</td>
                          <td>Collection Description</td>
                          <td>Author</td>
                          <td>Manage</td>
                        </tr>
                    </thead>
                    <tbody>
                    {collections?.map((C : Collections | undefined, i) =>{
                           
                        return  <tr key={i}>
                                    <td>{C?.title} </td>
                                    <td>{C?.category}</td>
                                    <td>{C?.description}</td>
                                    <td>{C?.author.username}</td>
                                    <td>
                                    <Button variant="secondary" onClick={() => favorite(C)}>Favorite</Button> {  }
                                    </td>
                                </tr> 
                    })}
                    </tbody>
                </Table>
        </>
        :
        <Redirect to="/login"/>
    )
}
export default DiscoverCollectionsComponent;