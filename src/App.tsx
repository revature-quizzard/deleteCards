import React, { useRef, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, orderBy, query, limit, addDoc, FieldValue, serverTimestamp, getDocs, QuerySnapshot } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider } from '@firebase/auth';
// import { Functions } from '@firebase/functions'
// const functions = require('firebase-functions');
import { useAuthState } from 'react-firebase-hooks/auth';


const app = initializeApp({
  // apiKey: "AIzaSyBum_fcLp106Z-_7fL6ICh8Osxhx6V1vFA",
  // authDomain: "revature-p2-4ae87.firebaseapp.com",
  // projectId: "revature-p2-4ae87",
  // storageBucket: "revature-p2-4ae87.appspot.com",
  // messagingSenderId: "89348054115",
  // appId: "1:89348054115:web:da67dfc93463086953ec56",
  // measurementId: "G-KKDLBTE2HQ"
  apiKey: "AIzaSyB8pS-aNMCBDeAq3kNCusKo7tw4UcJJvGk",
  authDomain: "revature-p2.firebaseapp.com",
  databaseURL: "https://revature-p2-default-rtdb.firebaseio.com",
  projectId: "revature-p2",
  storageBucket: "revature-p2.appspot.com",
  messagingSenderId: "873398562431",
  appId: "1:873398562431:web:007f553f0c79b9365bd94a",
  measurementId: "G-09NLC4QF1P"
})

const auth = getAuth(app);
const firestore = getFirestore(app);
// var functions = Functions.functions();
// const analytics = firebase.analytics();


function App() {

  const [user] = useAuthState(auth);
  // const user = auth.currentUser;

  console.log(user);

  return (
    <div className="App">
      <header className="App-header">
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

  // const dummy = useRef(null);

  const messagesRef = collection(firestore, 'messages');
  const q = query(messagesRef, orderBy('createdAt'), limit(25));
  
  //@ts-ignore
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    if (messages.length == 0) {
      getMessages().then(messages => {
        //@ts-ignore
        setMessages(messages)
      })
      .catch(err => console.log(err));
    }
    
  })

  const [formValue, setFormValue] = useState('');

  // TODO: Make Message data type

  const getMessages = async () => {
    //@ts-ignore
    let newMessages = [];
    let querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      //@ts-ignore
      newMessages.push(doc['_document']['data']['value']['mapValue']['fields']);
      console.log("In getMessages");
      //@ts-ignore
      console.log(doc['_document']['data']['value']['mapValue']['fields']);
    })
    //@ts-ignore
    console.log(newMessages.toString);
    //@ts-ignore
    return newMessages;
  }

  const sendMessage = async(e: any) => {

    // Prevents page from reloading
    e.preventDefault();

    //@ts-ignore
    const uid = auth.currentUser.uid;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid: uid
    })

    setFormValue('');

    //@ts-ignore
    // dummy.current.scrollIntoView({ behavior: 'smooth' });

  }

  // Re-get messages on every new document
  // functions.firestore.document('messages/*').onCreate(
  //   getMessages().then(messages => {
  //     //@ts-ignore
  //     setMessages(messages)
  // }))

  // getMessages();
  return (
    <>
      <main>
        {/* @ts-ignore */}
        {console.log(messages)}
        {/* @ts-ignore */}
        {messages.map(msg => <ChatMessage key={msg.uid.stringValue + msg.createdAt.timestampValue} uid={msg.uid.stringValue} message={msg.text.stringValue} />)}

        {/* <div ref={dummy}></div> */}
      </main>
      <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>

      <button type="submit">Submit</button>

      </form>
    </>
  )
}

function ChatMessage(props: any) {
  const uid = props.uid;
  const text = props.message;

  //@ts-ignore
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  // className={`message ${messageClass}`}>
  return (
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
    </div>
  )
}

export default App;
