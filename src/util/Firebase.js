import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3grs5gZ4TJs9CZPC8Xk74d_D6i6DTzqA",
  authDomain: "just-jk-commerce.firebaseapp.com",
  projectId: "just-jk-commerce",
  storageBucket: "just-jk-commerce.appspot.com",
  messagingSenderId: "316201503719",
  appId: "1:316201503719:web:c4bee15eb1ead276884b42",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
