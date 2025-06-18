
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

// Check for essential Firebase config variables
if (!firebaseConfig.apiKey) {
  console.error("CRITICAL Firebase Config Error: NEXT_PUBLIC_FIREBASE_API_KEY is missing or empty. Please check your .env.local file. Firebase services will likely fail.");
}
if (!firebaseConfig.projectId) {
  console.error("CRITICAL Firebase Config Error: NEXT_PUBLIC_FIREBASE_PROJECT_ID is missing or empty. Please check your .env.local file. Firebase services will likely fail.");
}

const essentialKeysValid = firebaseConfig.apiKey && firebaseConfig.projectId;

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
    auth = getAuth(app); 
  } catch (error) {
    console.error("Firebase Error: Failed to initialize Firestore/Auth services with the app instance. This often points to an invalid API key, incorrect project permissions, or services not enabled in Firebase console.", error);
    db = null;
    auth = null;
    // If core services fail, it might be an indication that 'app' although initialized, is not functional due to bad config.
    // Depending on the error, you might consider setting 'app = undefined' here too.
    // For instance, an 'auth/invalid-api-key' error at getAuth(app) means the app object is fundamentally non-functional for auth.
    if ((error as any).code === 'auth/invalid-api-key' || (error as any).code === 'auth/invalid-project-id') {
        console.warn("Firebase Warning: Detected invalid API key or Project ID during service initialization. Firebase app instance might be unusable.");
        // app = undefined; // Optionally mark app as unusable
    }
  }
} else {
  console.warn("Firebase Warning: Firebase app object is not available or failed to initialize. Firestore and Auth services will be offline. Ensure .env.local is correctly configured and Firebase project is set up.");
}

export { db, auth, app };
