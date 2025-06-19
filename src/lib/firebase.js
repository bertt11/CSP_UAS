import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMTqZNzsIyZHwuVlFDwLYK-VL7UDeGs2g",
  authDomain: "csp-uas-c14220241.firebaseapp.com",
  projectId: "csp-uas-c14220241",
  storageBucket: "csp-uas-c14220241.firebasestorage.app",
  messagingSenderId: "570802446784",
  appId: "1:570802446784:web:b7bbd0597405befd892825"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
