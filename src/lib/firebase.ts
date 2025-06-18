
import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let app: FirebaseApp | undefined;
let db: Firestore | null = null;
let auth: Auth | null = null;

const essentialKeysValid = firebaseConfig.apiKey && firebaseConfig.projectId;

if (!firebaseConfig.apiKey) {
  console.error("CRITICAL Firebase Config Error: NEXT_PUBLIC_FIREBASE_API_KEY is missing or empty. Please check your .env.local file. Firebase services will likely fail.");
}
if (!firebaseConfig.projectId) {
  console.error("CRITICAL Firebase Config Error: NEXT_PUBLIC_FIREBASE_PROJECT_ID is missing or empty. Please check your .env.local file. Firebase services will likely fail.");
}

if (!getApps().length) {
  if (essentialKeysValid) {
    try {
      app = initializeApp(firebaseConfig);
    } catch (error) {
      console.error("Firebase Error: Failed to initialize app during initial setup. This can be due to invalid config values (even if present).", error);
      app = undefined; 
    }
  } else {
    console.warn("Firebase Warning: Core Firebase initialization skipped during initial setup due to missing API Key or Project ID. Firebase services will be unavailable.");
    app = undefined; 
  }
} else {
  try {
    app = getApp();
  } catch (error) {
    console.error("Firebase Error: Failed to get existing app instance. This could mean the initial setup failed silently or the app was unmounted.", error);
    app = undefined;
  }
}

if (app) {
  try {
    db = getFirestore(app);
    auth = getAuth(app); // This is where an (auth/invalid-api-key) error would surface if `app` initialized but with a bad key.
  } catch (error) {
    console.error("Firebase Error: Failed to initialize Firestore/Auth services with the app instance. This often points to an invalid API key, incorrect project permissions, or services not enabled in Firebase console.", error);
    db = null;
    auth = null;
    // Consider if app should be set to undefined here if core services fail,
    // but typically Firebase allows app init and fails at service level.
  }
} else {
  console.warn("Firebase Warning: Firebase app object is not available or failed to initialize. Firestore and Auth services will be offline. Ensure .env.local is correctly configured and Firebase project is set up.");
}

export { db, auth, app };
