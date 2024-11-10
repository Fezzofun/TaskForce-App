// Check if service workers are supported by the browser
if ('serviceWorker' in navigator) {
    // Register the service worker on page load
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered!', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed!', error);
        });
    });
  }  