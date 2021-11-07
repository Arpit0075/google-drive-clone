import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA6y4OXt2H1fVwAqu2kR1mvIofqRu7-pTw",

  authDomain: "drive-clone-a509e.firebaseapp.com",

  projectId: "drive-clone-a509e",

  storageBucket: "drive-clone-a509e.appspot.com",

  messagingSenderId: "382927606622",

  appId: "1:382927606622:web:9d5c98c87b848128ae35cf",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider };
