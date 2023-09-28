
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {

    try {
      await navigator.serviceWorker.register('./sw.js', {scope: './'})
      if (navigator.serviceWorker.controller) {
        document.querySelector('#status').textContent =
          'Service worker active for this page';
      } else {
      
        document.querySelector('#status').textContent =
          'Service worker not active. Please reload the page';
      }

    } 
    catch(error){
      document.querySelector('#status').textContent = error;
    }
  } else {
    document.querySelector('#status').textContent = 'Browser does not suppport Service worker';
  }
}

