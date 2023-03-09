import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import { getFirestore, getDocs, collection } from 'firebase/firestore';

const app = firebase.initializeApp({

  apiKey: "AIzaSyDIzP7gh-szBe_NCVgJNK_eDeUTvquzR5I",
  authDomain: "auth-dev-62734.firebaseapp.com",
  projectId: "auth-dev-62734",
  storageBucket: "auth-dev-62734.appspot.com",
  messagingSenderId: "642600405180",
  appId:"1:642600405180:web:78c30f4bf883f1ba8ee8b9"

})

export const firestore = getFirestore();
export const CBRef = collection(firestore, 'currentBuild')
export const auth = firebase.auth(app)
export default app