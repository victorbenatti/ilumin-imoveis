import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDn2KfQTlJsgZanUiWOko87d_GcFgCPEHc",
  authDomain: "ilumin-imoveis.firebaseapp.com",
  projectId: "ilumin-imoveis",
  storageBucket: "ilumin-imoveis.firebasestorage.app",
  messagingSenderId: "231042570233",
  appId: "1:231042570233:web:e4e77f28f40b8b8db08f28"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);