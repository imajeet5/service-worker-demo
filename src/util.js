export const cleanUpCacheIfNewSession = async (key) => {
    if (!sessionStorage.getItem('isActive')) {
        
       await cleanUpCache(key)

        sessionStorage.setItem('isActive', true)
    }
}

export const cleanUpCache = async (key = '') => {
    const cacheNames = await caches.keys();
        await Promise.all(
            cacheNames.map((cacheName) => {
                if(cacheName.includes(key)){
                    console.log('Cleaning up exisiting cache -> ', cacheName)
                   return caches.delete(cacheName)
                }
            })
        );
}