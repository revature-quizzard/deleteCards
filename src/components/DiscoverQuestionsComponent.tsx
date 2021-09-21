import { Principal } from "../dtos/principal";
import { Collections } from "../dtos/collection";
import { Question } from "../dtos/question";
import { Redirect , Link } from "react-router-dom";
import {useState, useEffect} from "react";
import {getCollection} from "../remote/collection-service";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { FormControl, Input, InputLabel, makeStyles, Typography} from "@material-ui/core";



interface IDiscoverViewProps {
    currentUser: Principal | undefined;
    collection: Collections | undefined;
    setCollection: (nextCollection: Collections | undefined) => void
}
const useStyles = makeStyles({
    ManageContainer: {
        backgroundColor: "black",
        opacity: .94,
        justifyContent: "center",
        marginLeft: "10rem",
        marginTop: "5rem",
        width: "75%",
        height:"75%",
        borderRadius: "8em",
        border: "white",
        overflowY: "hidden",
    },
    TableStyle: {
        display:'flex',
        width: '100%',  
        maxHeight: '600px',
        overflowY: "scroll",
    }
    
}) 

const buttonStyle = {
    backgroundColor: '#5f2568',
    border: '#5f2568',
    color: "gold",
    marginLeft: '1em'
  }

function DiscoverQuestionsComponent(props: IDiscoverViewProps) {
    let [questions , setQuestions] = useState([] as Question[]);
    let [hasCollection, setHasCollection] = useState(false);
    let [showDelete, setShowDelete] = useState(false);
    let [showCreate, setShowCreate] = useState(false);
    let [showEdit, setShowEdit] = useState(false);
    let [errorMessage, setErrorMessage] = useState('');
    let [currentQuestion, setCurrentQuestion] = useState(undefined as Question | undefined);

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
                    setQuestions(temp.questionList);
                } else {
                    return;
                }
                console.log(props.collection)
            }

        } catch (e: any) {
            setErrorMessage(e.message); 
        }   
    }




    const classes = useStyles();
    return (
        props.currentUser
        ?
        <>
        <div>
            <div id = "manage-component" className={classes.ManageContainer} >
            <br></br>
            <br></br>  
            <h1 style = {{color: ' #FFD93D', marginLeft: '1em'}}>Manage "{props.collection?.title}" by {props.currentUser.username}</h1>
            <h6 style = {{color: ' #FFD93D', marginLeft: '3em'}}>Category: {props.collection?.category}</h6>
            <h6 style = {{color: ' #FFD93D', marginLeft: '3em'}}>Description: {props.collection?.description}</h6>
            <div className ={classes.TableStyle}>
            <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                          <td>Question</td>
                          <td>Answer</td>
                          <td>Difficulty</td>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Sort Questions by value, then by question, alphabetically */}
                    {questions.sort(
                        function (a: Question, b: Question) {
                            if (a.value == b.value) {
                                return a.question <= b.question ? -1 : 1;
                            }

                            return a.value > b.value ? 1 : -1;
                        })
                        .map((Q : Question | undefined, i) =>{
                           
                        return  <tr  key={i}>
                                    <td>{Q?.question} </td>
                                    <td>{Q?.answer}</td>
                                    <td>{Q?.value}</td>
                                </tr> 
                    })}
                    </tbody>
                </Table>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>    
        </>
        :
        <Redirect to="/login"/>
    )



}

export default DiscoverQuestionsComponent;