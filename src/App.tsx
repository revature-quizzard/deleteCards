import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, orderBy, query, limit, addDoc, FieldValue, serverTimestamp, getDocs, QuerySnapshot } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const app = initializeApp({
  apiKey: "AIzaSyBum_fcLp106Z-_7fL6ICh8Osxhx6V1vFA",
  authDomain: "revature-p2-4ae87.firebaseapp.com",
  projectId: "revature-p2-4ae87",
  storageBucket: "revature-p2-4ae87.appspot.com",
  messagingSenderId: "89348054115",
  appId: "1:89348054115:web:da67dfc93463086953ec56",
  measurementId: "G-KKDLBTE2HQ"
})

const auth = getAuth(app);
const firestore = getFirestore(app);
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
        {/* <SignIn /> */}
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
  let messages = [];
  
  // const [messages] = useCollectionData(q, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e: any) => {

    // Prevents page from reloading
    e.preventDefault();

    
    // await getDocs(q).then(querySnapshot => {
    //   querySnapshot.forEach((doc) => {
    //     messages.push(doc);
    //   })
    //   //@ts-ignore
    //   console.log(messages.toString);
    // });

    //@ts-ignore
    const uid = auth.currentUser.uid;

    // await addDoc(messagesRef, {
    //   text: formValue,
    //   createdAt: serverTimestamp(),
    //   uid: uid
    // })

    setFormValue('');

    //@ts-ignore
    // dummy.current.scrollIntoView({ behavior: 'smooth' });

  }

  return (
    <>
      <main>
        {/* @ts-ignore */}
        {/* {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)} */}

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
  const { text, uid } = props.message;

  //@ts-ignore
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
    </div>
  )
}

export default App;
