import {useState} from "react";
import {Principal} from "../dtos/principal";
import {getSavedCollections} from "../remote/user-service";
import ErrorMessageComponent from "./ErrorMessageComponent";
import { Redirect , Link } from "react-router-dom";
import { Collections } from "../dtos/collection";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Card } from "react-bootstrap";

let targetCollection :  [] | undefined;
let collectionVisible : boolean = false;


interface IGameCustomCollectionProps {
    currentUser: Principal | undefined,
    currentCollection:  [] | undefined,
    setCurrentCollection: (nextCollection:  [] | undefined) => void
}

function CustomGameComponent(props: IGameCustomCollectionProps) {
    let [collectionTitle , setCollectionTitle] = useState('');
    let [collectionCategory , setCollectionCategory] = useState('');
    let [collectionDescription, setCollectionDescription] = useState(''); 
    let [collectionAuthor , setCollectionAuthor] = useState('');
    
   

    let [errorMessage, setErrorMessage] = useState('');

    

    function updateCollectionCategory(e: any) {
        setCollectionCategory(e.currentTarget.value);
    }

    function updateCollectionDescription(e: any) {
        setCollectionDescription(e.currentTarget.value);
    }


 
        function selectCollection(index : number)
        {
            console.log(Number);
            return;
        }
    async function getCollection() {
        
        try {
                if(collectionVisible === false && props.currentUser)
                {
                             
                    //@ts-ignore
                    let user_id = props.currentUser.id;
                     targetCollection = await getSavedCollections( user_id, props.currentUser.token );  
                    // targetCollection?.forEach(() => element)
                    props.setCurrentCollection(targetCollection);
                } else if (collectionVisible === true && props.currentUser)  {

                    props.setCurrentCollection(undefined);
                    targetCollection = undefined;
                }else {

                    setErrorMessage('signed in You must be');
                }

                collectionVisible = !collectionVisible;
                console.log("Collections Visiblity : " + collectionVisible);

           }catch (e: any) {
            setErrorMessage(e.message); 
             }

            
    }
    
    
    return(
        !props.currentUser ? <Redirect to="/login"/> :
        <>
        
             <div>
               
             <br/><br/>
                {/* prints all user collections to the screen */}

                <Table  striped bordered hover variant="dark">
                    <thead>
                        <tr>
                          <td>Collection Title</td>
                          <td>Collection Category</td>
                          <td>Collection Description</td>
                          <td>By</td>
                          <td>  {/* sets target collection to users collection */} <Button variant="secondary" id="show-collections-btn" className="btn btn-primary" onClick={getCollection}>Show Collections</Button></td>
                <br/><br/>
                        </tr>
                    </thead>
                    <tbody>
                    {targetCollection?.map((C : Collections | undefined , i) =>{
                           
                           return  <tr key={i} >
                                             <td>{C?.title} </td>
                                             <td>{C?.category}</td>
                                             <td>{C?.description}</td>
                                             <td>{C?.author.username.toString()}  </td>
                                             <td><Button variant="secondary" key ={i} onClick={getCollection}>Select</Button></td>
                                            </tr> 
                                      })}
                    </tbody>
                </Table>

                <table>
                    <tbody>
                        <tr>
                            <td>
                            <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Game Manager</Card.Title>
                                <Card.Text>
                                Setup som pregame settings here
                                </Card.Text>
                                <Link to="/" className="btn btn-primary">Game Settings</Link>
                            </Card.Body>
                            </Card>
                            </td>
                            <td>
                            <Card style={{ width: '20rem' }}>
                            <Card.Body>
                                <Card.Title>Game Initiator</Card.Title>
                                <Card.Text>
                                Setup som pregame settings here
                                </Card.Text>
                                <Link to="/" className="btn btn-primary">Start Game</Link>
                            </Card.Body>
                            </Card>
                            </td>
                            <td>
                            <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Game Inspect</Card.Title>
                                <Card.Text>
                                Setup som pregame settings here
                                </Card.Text>
                                <Button variant="primary">Game View</Button>
                            </Card.Body>
                            </Card>
                            </td>
                        </tr>
                    </tbody>
                </table>
                { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }
            </div>
        </>
    )
}

export default CustomGameComponent;