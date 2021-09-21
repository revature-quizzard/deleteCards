import { initializeApp } from "@firebase/app";
// import { database } from "firebase-admin";
import "firebase/firestore";

const firebaseConfig = {
    // seanprdunn@gmail.com
    apiKey: "AIzaSyBum_fcLp106Z-_7fL6ICh8Osxhx6V1vFA",
    authDomain: "revature-p2-4ae87.firebaseapp.com",
    projectId: "revature-p2-4ae87",
    storageBucket: "revature-p2-4ae87.appspot.com",
    messagingSenderId: "89348054115",
    appId: "1:89348054115:web:da67dfc93463086953ec56",
    measurementId: "G-KKDLBTE2HQ"
    // proceedwithspeed@gmail.com
    // apiKey: "AIzaSyB8pS-aNMCBDeAq3kNCusKo7tw4UcJJvGk",
    // authDomain: "revature-p2.firebaseapp.com",
    // databaseURL: "https://revature-p2-default-rtdb.firebaseio.com",
    // projectId: "revature-p2",
    // storageBucket: "revature-p2.appspot.com",
    // messagingSenderId: "873398562431",
    // appId: "1:873398562431:web:007f553f0c79b9365bd94a",
    // measurementId: "G-09NLC4QF1P"
};

const app = initializeApp(firebaseConfig);

export default app;