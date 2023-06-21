// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyACuazyrptf_jE6ZC_fg5ptBMnize6vOog',
  authDomain: 'react-cursos-1e9c0.firebaseapp.com',
  projectId: 'react-cursos-1e9c0',
  storageBucket: 'react-cursos-1e9c0.appspot.com',
  messagingSenderId: '763535302640',
  appId: '1:763535302640:web:b3adcfef9ba9eb267c4735',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp); // Aqui viene toda la funcionalidad de autenticación
export const FirebaseDB = getFirestore(FirebaseApp); // Conf de la bd
