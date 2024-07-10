import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

// Configuraciones de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar autenticación y proveedor de Google
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Exportar instancia de Firestore
export const db = getFirestore(app);

export const storage = getStorage(app);
export { ref, listAll, getDownloadURL };

// Function to get assets from a specific folder
export const getAssets = async (path) => {
  const listRef = ref(storage, path);
  const res = await listAll(listRef);
  const urls = await Promise.all(res.items.map((item) => getDownloadURL(item)));
  return urls;
};
