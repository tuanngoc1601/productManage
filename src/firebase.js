import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDNlYdtCC23hWV4tt5TWFzxZf1zJurWWtE",
  authDomain: "product-p01.firebaseapp.com",
  projectId: "product-p01",
  storageBucket: "product-p01.appspot.com",
  messagingSenderId: "193098622059",
  appId: "1:193098622059:web:d6421f9363ab3dffddfd2e",
  measurementId: "G-944G18ZKC2",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
