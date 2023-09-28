import logo from './logo.svg';
import './App.css';
// import './registerServiceWorker'
import { useEffect, useState } from 'react';

function App() {
    const [joke, setJoke] = useState(null);

    useEffect(() => {
        import('./registerServiceWorker');
    }, []);

    useEffect(() => {
        const url = 'https://v2.jokeapi.dev/joke/Any';

        const getData = async () => {
            try {
                if (!sessionStorage.getItem('isActive')) {
                    const cacheNames = await caches.keys();
                    await Promise.all(
                        cacheNames.map((cn) => caches.delete(cn))
                    );
                }

                const response = await fetch(url);
                const result = await response.json();
                sessionStorage.setItem('isActive', true);
                console.log(result);
                setJoke(result);
            } catch (error) {
                console.error(error);
            }
        };

        getData();
    }, []);

    return (
        <div className="App">
            <h2>Hello</h2>
            <p id="status">Loading...</p>
            {!joke ? (
                <p>Loading joke...</p>
            ) : (
               joke.type !=='single' ? <div>
                    <p>{joke.setup}</p>
                    <p>{joke.delivery}</p>
                </div> : <p>{joke.joke}</p>
            )}
        </div>
    );
}

export default App;
