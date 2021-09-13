import {useState} from "react";
import {Principal} from "../dtos/principal";
import {GameSettings} from "../dtos/game-settings";
import {getSavedCollections} from "../remote/user-service";
import ErrorMessageComponent from "./ErrorMessageComponent";
import { Redirect , Link } from "react-router-dom";
import { Collections } from "../dtos/collection";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Card } from "react-bootstrap";
import GameSettingsModal from "./GameSettingsModal";
import { Question } from "../dtos/question";


let targetsCollections :  [] | undefined;
let targetCollectionQuestionsList :  [] | undefined;
let collectionVisible : boolean = false;
let collectionQLVisible : boolean = false;
let showCollectionText = "Show Collections";
let showQuestionListText ="Preview";

interface IGameCustomCollectionProps {
    currentUser: Principal | undefined,
    currentCollection:  [] | undefined,
    setCurrentCollection: (nextCollection:  [] | undefined) => void,
    currentGameSettings_:  GameSettings | undefined,
    setCurrentGameSettings_: (nextCollection: GameSettings | undefined) => void
}

function CustomGameComponent(props: IGameCustomCollectionProps) {
    let [collectionTitle , setCollectionTitle] = useState('');
    let [collectionCategory , setCollectionCategory] = useState(''); 
    let [collectionAuthor , setCollectionAuthor] = useState('');
    let [errorMessage, setErrorMessage] = useState('');
    let [showSettings, setShowSettings] = useState(false);
    let [currentCollection, setCurrentCollection] = useState(undefined as Collections | undefined);


    function displayModal() {
        setShowSettings(true);
        return undefined;
    }

    function getModal() {
        if(showSettings) {
            return <GameSettingsModal  current_user={props.currentUser} currentGameSettings={props.currentGameSettings_} setCurrentGameSettings={props.setCurrentGameSettings_} show={showSettings} setShow={setShowSettings} />;
        }
    }


    function displayQuestions(e : any , key: any) {

       

       if(collectionVisible && targetsCollections)
       {
           
           setCurrentCollection(targetsCollections[key]);
       
           console.log("key :  " , key ,  " value : " , targetsCollections[key]);
           // return early if there are no questions in list
           if(currentCollection?.questionList.length === 0 )
           { 
               collectionQLVisible = false;
               
               return;
           }

           if(collectionQLVisible === false)
           {
                targetCollectionQuestionsList = currentCollection?.questionList;
                collectionQLVisible = true;
                showQuestionListText = "Preview";
               
           }else if(collectionQLVisible === true && currentCollection){
                setCurrentCollection(undefined);
             //  currentCollection.questionList = [];
                targetCollectionQuestionsList = currentCollection?.questionList;   
                collectionQLVisible = false;
                showQuestionListText = "Hide";

           }else{
            console.log("Questions Visiblity : " + collectionQLVisible);
           }

        
            
        }
        else
        {
            setCurrentCollection(undefined);
             //  currentCollection.questionList = [];
                targetCollectionQuestionsList = currentCollection?.questionList; 
            collectionQLVisible = false;
            
        } 
        
        
    }

    function selectCollection(e: any , key: any)
    {
        if(collectionVisible && targetsCollections)
        {
              setCurrentCollection(targetsCollections[key]);
              console.log("key : " , key ,  " value : " , targetsCollections[key]);
        }
      
    }

    async function getCollection() {
        
        try {
                if(collectionVisible === false && props.currentUser)
                {
                    showCollectionText = "Hide Collections" ;
                    //@ts-ignore
                    let user_id = props.currentUser.id;
                     targetsCollections = await getSavedCollections( user_id, props.currentUser.token );  
                    
                    props.setCurrentCollection(targetsCollections);
                    
                } else if (collectionVisible === true && props.currentUser)  {

                    showCollectionText = "Show Collections" ;
                    props.setCurrentCollection(undefined);
                    targetsCollections = undefined;
                    
                }else {

                    setErrorMessage('signed in You must be');
                }

                collectionVisible = !collectionVisible;
                console.log("Collections Visiblity : " + collectionVisible);
                console.log("Questions Visiblity : " + collectionQLVisible);

           }catch (e: any) {
            setErrorMessage(e.message); 
             }  
    }
    
    
    return(
        !props.currentUser ? <Redirect to="/login"/> :
        <>
        
             <div>
                {/* prints all user collections to the screen */}

                <Table  striped bordered hover variant="dark">
                    <thead>
                        <tr>
                          <td>Collection Title</td>
                          <td>Collection Category</td>
                          <td>Collection Description</td>
                          <td>Author</td>
                          <td>Questions</td>
                          <td>  {/* sets target collection to users collection */} <Button variant="secondary" id="show-collections-btn" className="btn btn-primary" onClick={getCollection}>{`${showCollectionText.toString()}`}</Button></td>
                        </tr>
                    </thead>
                    <tbody>
                    {/* god loop */}
                    {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
                    {targetsCollections?.map((C : Collections | undefined , i) =>{
                           return  <tr key={i} >
                                             <td>{C?.title} </td>
                                             <td>{C?.category}</td>
                                             <td>{C?.description}</td>
                                             <td>{C?.author.username.toString()}</td>
                                             {/* mini loop cell*/}
                                             {/* ////////////////////////////////////////////////////////////////// */}
                                             <td>
                                                <p>"{C?.title}" (Preview?)</p>
                                                <ul>
                                                    {targetCollectionQuestionsList?.map((q : Question | undefined , i) =>{return <li key={i}>{q?.question}</li> })}
                                                </ul>
                                                   
                                             </td>
                                              {/* ////////////////////////////////////////////////////////////////// */}
                                             <td><Button variant="secondary" onClick={(e) => displayQuestions( e , i)}> {showQuestionListText.toString()}</Button> <Button variant="success" key={i} onClick={(e) => selectCollection( e , i)}> Select</Button></td>
                                            </tr> 
                                      })}
                     {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=+ */}
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
                                Setup some pregame settings here
                                </Card.Text>
                                <Button variant="success" onClick={displayModal}>Game Settings</Button>
                                {getModal()}
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
                                <Button variant="primary">Create Game</Button>
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