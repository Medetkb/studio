
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Check for essential Firebase config variables
if (!firebaseConfig.apiKey) {
  console.error("Firebase Error: NEXT_PUBLIC_FIREBASE_API_KEY is missing. Please check your .env.local file.");
}
if (!firebaseConfig.projectId) {
  console.error("Firebase Error: NEXT_PUBLIC_FIREBASE_PROJECT_ID is missing. Please check your .env.local file.");
}

// Initialize Firebase
let app;
if (!getApps().length) {
  if (firebaseConfig.apiKey && firebaseConfig.projectId) { // Only initialize if essential keys are present
    app = initializeApp(firebaseConfig);
  } else {
    console.error("Firebase initialization skipped due to missing API Key or Project ID.");
    // You might want to throw an error here or handle this case appropriately for your app
  }
} else {
  app = getApp();
}

// Conditionally initialize Firestore and Auth if app was initialized
const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;

if (!app) {
  console.warn("Firebase app was not initialized. Firestore and Auth services will not be available.")
}


export { db, auth, app };

