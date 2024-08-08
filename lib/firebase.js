import firebase from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAfxbFnc02aos0fRT0bQQB8XCL6-UuN05Y",
  authDomain: "reactweb-b9752.firebaseapp.com",
  databaseURL: "https://reactweb-b9752-default-rtdb.firebaseio.com",
  projectId: "reactweb-b9752",
  storageBucket: "reactweb-b9752.appspot.com",
  messagingSenderId: "393859501157",
  appId: "1:393859501157:web:877f7447bf0528439f8a8c",
  measurementId: "G-YVHKYD2P2Y"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const analytics = getAnalytics(); 