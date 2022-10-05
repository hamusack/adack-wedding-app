import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC-edDswII3YGO_kuDB8sZ9I1ETZEV2hj4",
  authDomain: "adack-wedding-app.firebaseapp.com",
  projectId: "adack-wedding-app",
  storageBucket: "adack-wedding-app.appspot.com",
  messagingSenderId: "994599611901",
  appId: "1:994599611901:web:69e9bf01d6dbf786fcbd94"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage();

export default app;