import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/analytics';
import 'firebase/app-check';

const firebaseConfig = {
  apiKey: process.env.DEV ? '' : '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

// init firebase
firebase.initializeApp(firebaseConfig);

const appCheck = firebase.appCheck();
appCheck.activate(
  // 'GET_APP_CHECK_TOKEN',
  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  true
);

// init firestore service

const analytics = process.env.DEV ? null : firebase.analytics();
const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const projectFunctions = firebase.functions();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {
  firebase,
  analytics,
  projectAuth,
  projectFirestore,
  projectFunctions,
  timestamp,
};
