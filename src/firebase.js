// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Aca pegás tu apiKey, authDomain, projectId, etc.
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

// Inicializa la app con esos datos
const app = initializeApp(firebaseConfig);

// Exportamos la instancia de Firestore para usarla en nuestra app
export const db = getFirestore(app);
