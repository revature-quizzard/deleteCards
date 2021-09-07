import {useState} from "react";
import {Principal} from "../dtos/principal";
import {getSavedCollections} from "../remote/user-service";
import ErrorMessageComponent from "./ErrorMessageComponent";
import { Redirect , Link } from "react-router-dom";
import { createCollection } from "../remote/collection-service";

let targetCollection : [] | undefined;
interface IGameCustomCollectionProps {
    currentUser: Principal | undefined,
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


 

    async function getCollection() {
        
        try {
                if(props.currentUser)
                {
                    if (collectionTitle && collectionDescription && collectionCategory  && collectionAuthor) {              
                    //@ts-ignore
                    let user_id = props.currentUser.id;
                    targetCollection = await getSavedCollections(user_id); 
                } else {
                    setErrorMessage('signed in You must be');
                }

                }
                
           }catch (e: any) {
            setErrorMessage(e.message); 
             }
    }
    
    
    return(
        props.currentUser ? <Redirect to="/login"/> :
        <>
        
             <div>
                 {/* sets target collection to users collection */}
                <button id="show-collections-btn" onClick={getCollection}>Show Collections</button>
                <br/><br/>
                {/* prints all user collections to the screen */}
                <ul>
                    {targetCollection?.map(data => (<li>{data}</li>))}
                </ul>
                <br/><br/>

                <Link to="/" className="btn btn-primary">Game Settings</Link>
                <br/><br/>
                <input id="collection-description-input" type="text" onChange={updateCollectionDescription} placeholder="description"/>
                <br/><br/>
                 {/* will link to somthing meaning full when implementation  */}
                <Link to="/" className="btn btn-primary">Start Game</Link>
                <br/><br/>
                { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }
            </div>
        </>
    )
}

export default CustomGameComponent;