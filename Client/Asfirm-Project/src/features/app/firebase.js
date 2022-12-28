// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// import { shouldProcessLinkClick } from 'react-router-dom/dist/dom';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APPID,
};

/*

API_Key: 'AIzaSyAustDGIz4XT7BI-hnfxm0AUdqvFgoer6E'
  AUTH_DOMAIN: 'asfirmproject.firebaseapp.com'
  PROJECTID: 'asfirmproject'
  STORAGEBUCKET: 'asfirmproject.appspot.com'
  MESSAGING_SENDER_ID: '70021909357'
  APPID:

*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
