
// Track whether we've shown the update notification
let updateNotificationShown = false;

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // Register the service worker with a cache-busting query parameter
      const swUrl = `/sw.js?v=${new Date().getTime()}`;
      const registration = await navigator.serviceWorker.register(swUrl);
      console.log('Service Worker registered successfully:', registration);
      
      // Check if there's already a controller (page reload with active SW)
      if (navigator.serviceWorker.controller) {
        console.log('Service Worker is already controlling this page');
      }
      
      // Handle updates - this is for future updates after the page has loaded
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('New service worker found:', newWorker?.state);
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            console.log('Service worker state changed:', newWorker.state);
            
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller && !updateNotificationShown) {
              // New content is available and waiting
              updateNotificationShown = true;
              console.log('New version available!');
              
              if (window.confirm('Uusi versio saatavilla. Päivitä nyt?')) {
                // Send message to the service worker to skip waiting
                newWorker.postMessage({ type: 'SKIP_WAITING' });
                
                // Add a listener for controlling change to reload the page
                navigator.serviceWorker.addEventListener('controllerchange', () => {
                  console.log('New service worker activated, reloading page');
                  window.location.reload();
                });
              } else {
                // Reset flag if user cancels
                updateNotificationShown = false;
              }
            }
          });
        }
      });
      
      // Also handle the case where a new service worker is waiting on load
      if (registration.waiting && navigator.serviceWorker.controller && !updateNotificationShown) {
        updateNotificationShown = true;
        console.log('New version waiting on page load!');
        
        if (window.confirm('Uusi versio saatavilla. Päivitä nyt?')) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('New service worker activated, reloading page');
            window.location.reload();
          });
        } else {
          // Reset flag if user cancels
          updateNotificationShown = false;
        }
      }
      
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

export const showInstallPrompt = () => {
  let deferredPrompt: any = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    deferredPrompt = e;
    
    // Show custom install button
    const installButton = document.getElementById('install-button');
    if (installButton) {
      installButton.style.display = 'block';
      
      installButton.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          console.log(`User response to the install prompt: ${outcome}`);
          deferredPrompt = null;
          installButton.style.display = 'none';
        }
      });
    }
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    deferredPrompt = null;
  });
};

export const checkOnlineStatus = () => {
  const updateOnlineStatus = () => {
    const status = navigator.onLine ? 'online' : 'offline';
    console.log('Connection status:', status);
    
    // Show/hide offline indicator
    const offlineIndicator = document.getElementById('offline-indicator');
    if (offlineIndicator) {
      offlineIndicator.style.display = navigator.onLine ? 'none' : 'block';
    }
  };

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  // Initial check
  updateOnlineStatus();
};
