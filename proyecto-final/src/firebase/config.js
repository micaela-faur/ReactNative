import app from 'firebase/app';
import firebase from 'firebase';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIZ1qwgw2y0-CvZ2H9zDB8UwGqh0FO6QM",
  authDomain: "tptrabajofinal.firebaseapp.com",
  projectId: "tptrabajofinal",
  storageBucket: "tptrabajofinal.appspot.com",
  messagingSenderId: "435111825621",
  appId: "1:435111825621:web:a55e575ad078f4b5ae925c"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();