import {useState, useEffect} from "react";
import {Principal} from "../dtos/principal";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Collections } from "../dtos/collection";
import {getAllCollections} from "../remote/collection-service";
import { Redirect , Link } from "react-router-dom";
import { getFavorites, favorite, unfavorite} from "../remote/user-service";

interface IDiscoverProps {
    currentUser: Principal | undefined;
    setCurrCollection: (nextCollection: Collections | undefined) => void
}

const buttonStyle = {
    backgroundColor: '#5f2568',
    border: '#5f2568',
    color: "lime",
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

    function favoriteCollection(collection : Collections | undefined) {
        if(collection) {
            try{
                favorite(props.currentUser?.id as string, collection.id, props.currentUser?.token as string)
                let temp : Collections[] = collections.filter((c : Collections) => {
                    return !(c.id === collection.id)
                })
                setCollections(temp);
            } catch (e : any) {
                setErrorMessage(e);
            }
        }
    }

    async function getCollection() {    
        try {   
            if(props.currentUser) {
                setHasCollections(true);
                //@ts-ignore
                let user_id = props.currentUser.id;
                let temp = await getAllCollections(props.currentUser.token );
                let favorited : Collections[] = await getFavorites(props.currentUser.id, props.currentUser.token) as Collections[]
                if(temp) {
                    console.log("TEMP", temp)
                    temp = temp.filter((c : Collections) => {
                        return (c.author.username != props.currentUser?.username)
                    })
                    console.log("TEMP", temp)
                    console.log("FAVS", favorited)

                    let toShow : Collections[] = []
                    temp = temp.filter((c : Collections) => {
                        for(let i = 0; i < favorited?.length; i++) {
                            if(favorited[i].id === c.id) {
                                console.log("MATCH", favorited[i].title, c.title)
                                return false;
                            }
                        }
                        return true;
                    })
                    console.log("TEMP", temp)
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
                          <td>Question Count</td>
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
                                    <td>{C?.questionList.length}</td>
                                    <td>
                                    <Button style = {buttonStyle} variant="secondary" onClick={() => favoriteCollection(C)}>Favorite</Button> {  }
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