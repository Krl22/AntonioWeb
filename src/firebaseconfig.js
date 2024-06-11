import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuraciones de Firebase
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyDOKWFq82tCkP8sP9nSp9V3A4xH2OVntkk",
  authDomain: "esol-auth.firebaseapp.com",
  projectId: "esol-auth",
  storageBucket: "esol-auth.appspot.com",
  messagingSenderId: "868969771011",
  appId: "1:868969771011:web:0a34769858bfaa5f6b1e36",
  measurementId: "G-R08YN5ZPG2",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar autenticación y proveedor de Google
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Exportar instancia de Firestore
export const db = getFirestore(app);
