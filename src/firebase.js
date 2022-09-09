import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-_3PFcM9iuqm6iuym1jzySbf8eupBp1s",
  authDomain: "todo-retake.firebaseapp.com",
  projectId: "todo-retake",
  storageBucket: "todo-retake.appspot.com",
  messagingSenderId: "357888037320",
  appId: "1:357888037320:web:7642e26674976d09ecb0fd",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
