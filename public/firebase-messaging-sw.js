// Self-registration for the service worker
self.addEventListener('install', function(event) {
  console.log('[firebase-messaging-sw.js] Service Worker installed');
  self.skipWaiting(); // Ensure the service worker activates immediately
});

// Handle service worker activation
self.addEventListener('activate', function(event) {
  console.log('[firebase-messaging-sw.js] Service Worker activated');
  event.waitUntil(self.clients.claim()); // Take control of all clients
});

// Import Firebase scripts
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "AIzaSyB0Nxf3pvW32KBc0D1o2-K6qIeKovhGWfg",
  authDomain: "new1-f04b3.firebaseapp.com",
  projectId: "new1-f04b3",
  storageBucket: "new1-f04b3.firebasestorage.app",
  messagingSenderId: "802463638703",
  appId: "1:802463638703:web:bd0bbdaf3407d784d5205a",
  measurementId: "G-3RZEW537LN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Get the base URL for assets
const baseUrl = self.location.origin;

// Helper function to validate image URLs
function isValidImageUrl(url) {
  if (!url || url === 'undefined' || url === '') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Track processed notification IDs to prevent duplicates
const processedNotifications = new Set();

// Service worker version - used for logging
const SW_VERSION = '2.0.0';

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log(`[SW v${SW_VERSION}] Received background message`, payload);
  
  // Extract notification ID to prevent duplicates
  const notificationId = payload.messageId || payload.collapseKey || Date.now().toString();
  
  // Skip if we've already processed this notification
  if (processedNotifications.has(notificationId)) {
    console.log(`[SW v${SW_VERSION}] Skipping duplicate notification ${notificationId}`);
    return;
  }
  
  // Check for iOS - handle differently based on device
  const userAgent = self.navigator ? self.navigator.userAgent : '';
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  console.log(`[SW v${SW_VERSION}] Device detection - iOS: ${isIOS}, UA: ${userAgent.substring(0, 50)}...`);
  
  // Add to processed set
  processedNotifications.add(notificationId);
  console.log(`[SW v${SW_VERSION}] Added notification ${notificationId} to processed set. Total: ${processedNotifications.size}`);
  
  // Clear old notification IDs (keep set small)
  if (processedNotifications.size > 20) {
    const oldestId = processedNotifications.values().next().value;
    processedNotifications.delete(oldestId);
    console.log(`[SW v${SW_VERSION}] Removed oldest notification ${oldestId} from processed set`);
  }
  
  // Extract notification data
  const title = payload.notification?.title || payload.data?.title || "New Notification";
  const body = payload.notification?.body || payload.data?.body || "You have a new notification";
  const link = payload.fcmOptions?.link || payload.data?.link || '/';
  const image = payload.data?.image || payload.notification?.image;
  
  const notificationOptions = {
    body,
    // Use exact same icon path as Vite project
    icon: `${baseUrl}/ic_stat_barber_1024/res/drawable-xxxhdpi/ic_stat_barber_1024.png`,
    badge: `${baseUrl}/ic_stat_barber_1024/res/drawable-xxxhdpi/ic_stat_barber_1024.png`,
    data: { 
      url: link,
      ...payload.data,
      // Store notification ID to prevent duplicates later
      notificationId,
      fromServiceWorker: true, // Flag to identify source
      swVersion: SW_VERSION
    },
    // Use notification ID as tag to prevent duplicate system notifications
    tag: notificationId,
    renotify: false,
    requireInteraction: !isIOS,
    silent: isIOS // Keep notifications silent on iOS
  };

  if (isValidImageUrl(image)) {
    notificationOptions.image = image;
    console.log(`[SW v${SW_VERSION}] Adding image to notification:`, image);
  }

  console.log(`[SW v${SW_VERSION}] Creating notification with options:`, notificationOptions);
  return self.registration.showNotification(title, notificationOptions);
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  console.log(`[SW v${SW_VERSION}] Notification clicked`, event);
  event.notification.close();
  
  const url = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // Focus existing window with matching URL if found
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Otherwise open a new window
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});

// Add explicit push event listener to prevent browser from showing its own notification
self.addEventListener('push', (event) => {
  console.log(`[SW v${SW_VERSION}] Push event received but letting Firebase handle it`);
  event.stopImmediatePropagation();
  // Don't do anything here - let Firebase's onBackgroundMessage handle it
  // This just prevents the browser from showing its own notification
});
