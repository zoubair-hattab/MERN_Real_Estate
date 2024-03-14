import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE,
  authDomain: 'realestate-3def0.firebaseapp.com',
  projectId: 'realestate-3def0',
  storageBucket: 'realestate-3def0.appspot.com',
  messagingSenderId: '927560337817',
  appId: '1:927560337817:web:64f67998d9bbdbe04dab08',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
