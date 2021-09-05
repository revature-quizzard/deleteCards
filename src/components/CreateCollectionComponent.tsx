import {useState} from "react";
import {Principal} from "../dtos/principal";
import ErrorMessageComponent from "./ErrorMessageComponent";
import {Redirect} from "react-router-dom";
import { createCollection } from "../remote/create-colletion";

interface ICreateCollectionProps {
    currentUser: Principal | undefined,
}

function CreateCollectionComponent(props: ICreateCollectionProps) {
    let [collectionTitle , setCollectionTitle] = useState('');
    let [collectionCategory , setCollectionCategory] = useState('');
    let [collectionDescription, setCollectionDescription] = useState(''); 
    let [collectionAuthor , setCollectionAuthor] = useState('');
    

    let [errorMessage, setErrorMessage] = useState('');

    function updateCollectionTitle(e: any) {
        setCollectionTitle(e.currentTarget.value);
    }

    function updateCollectionCategory(e: any) {
        setCollectionCategory(e.currentTarget.value);
    }

    function updateCollectionDescription(e: any) {
        setCollectionDescription(e.currentTarget.value);
    }


 

    async function create() {
        try {

           if(props.currentUser) 
           {
                setCollectionAuthor(props.currentUser.username);
                if (collectionTitle && collectionDescription && collectionCategory  && collectionAuthor) {              
                    //@ts-ignore
                    
                    let colectiton = await createCollection({collectionTitle ,collectionDescription ,collectionCategory , collectionAuthor }); 
                    
                    
                } else {
                    setErrorMessage('You must provide all fields!');
                }
           }
          
        } catch (e: any) {
            setErrorMessage(e.message); 
        }

        return (
            props.currentUser ? <Redirect to="/"/> :
        <>
            <div>
                <input id="collection-name-input" type="text" onChange={updateCollectionTitle} placeholder="title"/>
                <br/><br/>
                <input id="collection-category-input" type="text" onChange={updateCollectionCategory} placeholder="category"/>
                 <br/><br/>
                <input id="collection-description-input" type="text" onChange={updateCollectionDescription} placeholder="description"/>
                <br/><br/>
                <button id="create-btn" onClick={create}>Create Colleciton</button>
                <br/><br/>
                { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }
            </div>
        </>
        )
    }
    
    
    return(
        props.currentUser ? <Redirect to="/"/> :
        <>
             <div>
                <input id="collection-name-input" type="text" onChange={updateCollectionTitle} placeholder="title"/>
                <br/><br/>
                <input id="collection-category-input" type="text" onChange={updateCollectionCategory} placeholder="category"/>
                 <br/><br/>
                <input id="collection-description-input" type="text" onChange={updateCollectionDescription} placeholder="description"/>
                <br/><br/>
                <button id="create-btn" onClick={create}>Create Colleciton</button>
                <br/><br/>
                { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }
            </div>
        </>
    )
}

export default CreateCollectionComponent;