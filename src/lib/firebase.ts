// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCzdAeFf8VVhsiWbABGzErGw13UsMcSFtk',
  authDomain: 'redux-tech.firebaseapp.com',
  projectId: 'redux-tech',
  storageBucket: 'redux-tech.appspot.com',
  messagingSenderId: '887077658618',
  appId: '1:887077658618:web:998e2f53eed6ad3eb50e43',
  measurementId: 'G-3TNH35VKEG',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
