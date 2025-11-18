import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC0Ua6PB4nkDOixcUxkmopNAZ808agyiLQ",
    authDomain: "gamehub-ai-8002f.firebaseapp.com",
    projectId: "gamehub-ai-8002f",
    storageBucket: "gamehub-ai-8002f.firebasestorage.app",
    messagingSenderId: "152919323724",
    appId: "1:152919323724:web:88905c7b371484b404f0e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
