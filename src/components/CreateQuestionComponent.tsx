import {useState} from "react";
import {Principal} from "../dtos/principal";
import ErrorMessageComponent from "./ErrorMessageComponent";
import {Redirect} from "react-router-dom";
import { createQuestion } from "../remote/question-service"

interface ICreateQuestionProps {
    currentUser: Principal | undefined,
}

function CreateQuestionComponent(props: ICreateQuestionProps) {
    let [question , setQuestion] = useState('');
    let [answer , setAnswer] = useState('');
    let [category, setCategory] = useState(''); 
    let [value , setValue] = useState('');
    let created : boolean = false;

    let [errorMessage, setErrorMessage] = useState('');

    function updateQuestion(e: any) {
        setQuestion(e.currentTarget.value);
    }

    function updateValue(e: any) {
        setValue(e.currentTarget.value);
    }

    function updateCategory(e: any) {
        setCategory(e.currentTarget.value);
    }

    function updateAnswer(e: any) {
        setAnswer(e.currentTarget.value);
    }


 

    async function create() {
        try {

           
                
                if (question && answer && category  && value && answer) {              
                    //get questions answer
                    
                    let question_ = await createQuestion({question ,answer ,category , value }); 
                    created = true;
                    
                } else {
                    created = false;
                    setErrorMessage('You must provide all fields!');
                }
           
          
        } catch (e: any) {
            setErrorMessage(e.message); 
        }

        return (
            // if the object was not created send user back to the top of the screen
          created == false ? <Redirect to="/"/> :
        <>
            <div>
                <input id="collection-name-input" type="text" onChange={updateQuestion} placeholder="title"/>
                <br/><br/>
                <input id="collection-category-input" type="text" onChange={updateCategory} placeholder="category"/>
                 <br/><br/>
                <input id="collection-description-input" type="text" onChange={updateValue} placeholder="points"/>
                <br/><br/>
                <input id="collection-description-input" type="text" onChange={updateAnswer} placeholder="points"/>
                <br/><br/>
                <button id="create-btn" onClick={create}>Create Question</button>
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
                <input id="collection-name-input" type="text" onChange={updateQuestion} placeholder="title"/>
                <br/><br/>
                <input id="collection-category-input" type="text" onChange={updateCategory} placeholder="category"/>
                 <br/><br/>
                <input id="collection-description-input" type="text" onChange={updateValue} placeholder="points"/>
                <br/><br/>
                <input id="collection-description-input" type="text" onChange={updateAnswer} placeholder="points"/>
                <br/><br/>
                <button id="create-btn" onClick={create}>Create Question</button>
                <br/><br/>
                { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }
            </div>
        </>
    )
}

export default ICreateQuestionProps;