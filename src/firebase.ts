import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyCWdNZ2L4O7wBmlkV2JswYfoF8CGnDxIJw",
  authDomain: "predictify-3d23b.firebaseapp.com",
  projectId: "predictify-3d23b",
  storageBucket: "predictify-3d23b.appspot.com",
  messagingSenderId: "11189127552",
  appId: "1:11189127552:web:73c19e20da7881c4c85965",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);


export { app, db, auth, storage, analytics };
