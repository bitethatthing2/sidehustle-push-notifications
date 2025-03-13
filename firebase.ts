import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0Nxf3pvW32KBc0D1o2-K6qIeKovhGWfg",
  authDomain: "new1-f04b3.firebaseapp.com",
  projectId: "new1-f04b3",
  storageBucket: "new1-f04b3.firebasestorage.app",
  messagingSenderId: "802463638703",
  appId: "1:802463638703:web:bd0bbdaf3407d784d5205a",
  measurementId: "G-3RZEW537LN"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      // Add console log for debugging
      console.log("Attempting to get FCM token with VAPID key:", 
        process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY ? "Key exists (length: " + 
        process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY.length + ")" : "Key missing");
      
      // For testing, use a try/catch to handle service worker issues
      try {
        const token = await getToken(fcmMessaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
        });
        console.log("FCM token obtained:", token ? token.substring(0, 10) + "..." : "null");
        return token;
      } catch (swError) {
        console.error("Service worker error:", swError);
        // Return a placeholder token for testing
        console.log("Returning placeholder token for testing");
        return "test-token-for-ui-development";
      }
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
