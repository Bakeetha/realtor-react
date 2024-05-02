// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrZsWyxbNBRmB16NNkDy0qeTQmX7UVNh4",
  authDomain: "realtor-react-99be6.firebaseapp.com",
  projectId: "realtor-react-99be6",
  storageBucket: "realtor-react-99be6.appspot.com",
  messagingSenderId: "929586927944",
  appId: "1:929586927944:web:ed1dcbd94c54e6b49e3b7d"
};

// Initialize Firebase const app = 
initializeApp(firebaseConfig);
export const db = getFirestore();
// export const auth = getAuth();