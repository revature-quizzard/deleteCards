import {useState} from "react";
import {Principal} from "../dtos/principal";
import {GameSettings} from "../dtos/game-settings";
import {getSavedCollections} from "../remote/user-service";
import ErrorMessageComponent from "./ErrorMessageComponent";
import { Redirect , Link } from "react-router-dom";
import { Collections } from "../dtos/collection";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Alert, Card, ListGroup } from "react-bootstrap";
import GameSettingsModal from "./game-modals/GameSettingsModal";
import { Question } from "../dtos/question";
import * as firestore from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import app from '../util/Firebase';
import { stringify } from "querystring";


const db = firestore.getFirestore(app);

let targetsCollections :  [] | undefined;
let targetCollectionQuestionsList :  [] | undefined;
let globalKey : Number | undefined;
let collectionVisible : boolean = false;
let collectionQLVisible : boolean = false;
let showCollectionText = "Show Collections";
let showQuestionListText ="Preview";

interface IGameCustomCollectionProps {
    currentUser: Principal | undefined,
    selectedCollection: Collections | undefined,
    setSelectedCollection: (nextCollection: Collections | undefined) => void
    currentCollections:  [] | undefined,
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
            props.setSelectedCollection(currentCollection);
            return <GameSettingsModal  current_user={props.currentUser} selectedCollection={props.selectedCollection} currentGameSettings={props.currentGameSettings_} setCurrentGameSettings={props.setCurrentGameSettings_} show={showSettings} setShow={setShowSettings} />;
        }
    }

    function sendGameSettings()
    {
          const gamesRef = firestore.collection(db , "games");

          firestore.addDoc(gamesRef , props.currentGameSettings_);
    }


    function displayQuestions(e : any) { 
        
       console.log("pressed");
         

           if(collectionQLVisible === false){

                   console.log(" on");
                collectionQLVisible = true;
                showQuestionListText = "Preview";
                targetCollectionQuestionsList = currentCollection?.questionList;
                props.setSelectedCollection(currentCollection);
           
           }else{
            console.log(" off ");
            if(currentCollection)
             currentCollection.questionList = [];

                collectionQLVisible = false;
                showQuestionListText = "-";  
             
                
                targetCollectionQuestionsList = currentCollection?.questionList;
                 props.setSelectedCollection(currentCollection);
               
           }

                
             //  currentCollection.questionList = [];
             
             
           }
            
  
    

    function selectCollection(e: any , key: any)
    {
        if(targetsCollections)
        {
              targetCollectionQuestionsList = [];
              showQuestionListText = "Preview";
              setCurrentCollection(targetsCollections[key]);
              props.setSelectedCollection(currentCollection);
                let maxPlayers: Number = 2;
                let matchTimer : Number = 30;
                let collection : Collections = currentCollection as Collections;
                let category : string | undefined = currentCollection?.category;
                let name: string = 'new collection';
              props.setCurrentGameSettings_({maxPlayers   , matchTimer , collection  , category  , name });
             
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
                    targetsCollections = undefined;
                    props.setCurrentCollection(targetsCollections);
                    
                    
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
                          <td>  {/* sets target collection to users collection */} <Button variant="secondary" id="show-collections-btn" className="btn btn-primary" onClick={getCollection}>{`${showCollectionText.toString()}`}</Button></td>
                        </tr>
                    </thead>
                    <tbody>
                    {/* god loop */}
                    {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
                    {targetsCollections?.map((C : Collections | undefined , i ) =>{
                           return  <tr key={i} >
                                             <td>{C?.title} </td>
                                             <td>{C?.category}</td>
                                             <td>{C?.description}</td>
                                             <td>{C?.author.username.toString()}</td>
                                             <td> <Button variant="success" key={i} onClick={(e) => selectCollection( e , i)}> Select</Button></td>
                                            </tr> 
                                      })}
                     {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=+ */}
                    </tbody>
                </Table >

                <table>
                    <tbody>
                        <tr>
                            <td>
                            <Card style={{ width: '22rem' }} className="bg-dark text-white" >
                            <Card.Body>
                                <Card.Title>Game Manager</Card.Title>
                                
                                
                                <Card.Text>
                                  Set up your game
                                </Card.Text>
                                <Button variant="success" onClick={displayModal}>Game Settings</Button>
                                {getModal()}
                            </Card.Body>
                            </Card> 
                            
                            </td>
                            <td>
                            <Card style={{ width: '22rem' }} className="bg-dark text-white">
                           
                            <Card.Body>
                                <Card.Title>Game Initiator</Card.Title>

                                <Card.Text>
                                <br />
                                <ListGroup  >
                                    <ListGroup.Item><h6>Summary</h6></ListGroup.Item>
                                    <ListGroup.Item>  Collection : "{currentCollection?.title}"</ListGroup.Item>
                                    <ListGroup.Item>Match time : {props.currentGameSettings_?.matchTimer} (seconds)</ListGroup.Item>
                                    <ListGroup.Item>Category : {currentCollection?.category}</ListGroup.Item>
                                    <ListGroup.Item>Max Players : {props.currentGameSettings_?.maxPlayers}</ListGroup.Item>
                                    <ListGroup.Item> Name : {props.currentGameSettings_?.name}</ListGroup.Item>
                                </ListGroup>
                               
                                </Card.Text>
                                {
                                     currentCollection?.category ? 
                                     <Link to="/game" className="btn btn-success" onClick={sendGameSettings} >Start Game</Link>
                                     :

                                     <Alert variant="danger">
                                     <Alert.Heading>Oh snap! You got forgot to pick a Collection!</Alert.Heading>
                                   </Alert>
                                     
                                }
                                
                            </Card.Body>
                         
                            </Card>
                            </td>
                            <td>
                            <Card style={{ width: '22rem' }} className="bg-dark text-white">
                            <Card.Body>
                                <Card.Title>Game Inspect</Card.Title>
                                <Card.Text>
                                 See the "{currentCollection?.title}" Preview here! 
                                </Card.Text>
                                <Button variant="success" onClick={displayQuestions} >{showQuestionListText.toString()}</Button>
                                <br />
                                 <ul>
                                   {targetCollectionQuestionsList?.map((q : Question | undefined , i) =>{ return <li key={i}>{q?.question}</li> })}
                                 </ul> 
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