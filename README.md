# Service Worker

Leveraging service worker to caching the requests. 

With the help of service-worker in the browser we can use the browser cache api (https://developer.mozilla.org/en-US/docs/Web/API/Cache) to cache any outgoing request and if the result already present serve it from the browser caches. 

**A service worker sits between the app, the browser, and the server, providing a secure connection that runs in the background on a separate thread.**

So to start with first we have to register the service worker js file as it will run on a seperate thread. That is basically 

```jsx
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js', {scope: './'})
}
```

Now in our js file we can put the logic of handing the fetch request and caching rule for them. We can also decide when to invalidate the cache for the request. 

