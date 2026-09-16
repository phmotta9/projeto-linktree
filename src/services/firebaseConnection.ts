import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7C-8Q-UQdLsUfu9gc_m77fio-tzOZ8-A",
  authDomain: "reactlinks-dd003.firebaseapp.com",
  projectId: "reactlinks-dd003",
  storageBucket: "reactlinks-dd003.firebasestorage.app",
  messagingSenderId: "392896984096",
  appId: "1:392896984096:web:240025f7017a2a7b3db845"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };