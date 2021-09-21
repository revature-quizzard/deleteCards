import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";

const config = {
    // apiKey: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_KEY,
    // authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`,
    projectid: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

function initFirebase() {
    if(!firebase.getApps.length)
    {
        firebase.initializeApp(config);
    }
}


initFirebase();

export { firebase };