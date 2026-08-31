import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * Firebase client. The config values below are Vite env vars (VITE_ prefix, so
 * they are exposed to the browser bundle) read from `.env.local` — see
 * `.env.example` for the keys. These web-config values are NOT secrets: Firebase
 * ships them in every client bundle by design. What actually guards your data is
 * Firestore Security Rules, not hiding this config.
 *
 * For the contact form the rule set should allow anonymous visitors to CREATE a
 * submission but never read, update, or delete them, e.g.:
 *
 *   rules_version = '2';
 *   service cloud.firestore {
 *     match /databases/{database}/documents {
 *       match /contactSubmissions/{id} {
 *         allow create: if
 *           request.resource.data.keys().hasOnly(
 *             ['fullName','company','email','phone','service','details','createdAt']
 *           )
 *           && request.resource.data.fullName is string
 *           && request.resource.data.fullName.size() > 0
 *           && request.resource.data.email is string
 *           && request.resource.data.details is string;
 *         allow read, update, delete: if false;
 *       }
 *     }
 *   }
 *
 * Read submissions from the Firebase console (or an authenticated admin view),
 * never from this public client.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Guard against a half-configured environment so failures are legible in dev
// rather than surfacing as an opaque Firebase error on first write.
export const firebaseReady = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId,
);

const app = firebaseReady ? initializeApp(firebaseConfig) : null;

export const db = app ? getFirestore(app) : null;
