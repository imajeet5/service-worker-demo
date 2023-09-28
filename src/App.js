import './App.css';

import { useEffect, useState } from 'react';
import { cleanUpCache, cleanUpCacheIfNewSession } from './util';
import { requestJoke } from './requestJoke';

const CacheKey = {
    reqJokes: 'reqJokes-v',
};

function App() {
    const [jokeData, setJoke] = useState(null);

    let swStatus = '';

    if (navigator.serviceWorker.controller) {
        swStatus = 'Service worker active for this page';
    } else {
        swStatus = 'Service worker not active. Please reload the page';
    }

    useEffect(() => {
        const init = async () => {
            await cleanUpCacheIfNewSession(CacheKey.reqJokes);
            const jokeData = await requestJoke();
            setJoke(jokeData);
        };

        init();
    }, []);

    const onNewRequest = async () => {
        setJoke(null);
        const jokeData = await requestJoke();
        setJoke(jokeData);
    };

    return (
        <div className="App">
           
            <p id="status">{swStatus}</p>
            <h3>Wanna hear a joke?</h3>
            <div
                style={{
                    background: '#8bd5de',
                    padding: '5px',
                    fontFamily: 'cursive',
                    fontSize: '1.2rem',
                    width: '500px',
                    margin: 'auto',
                    borderRadius: '18px',
                }}
            >
                {' '}
                {!jokeData ? (
                    <p>Loading joke...</p>
                ) : jokeData.type !== 'single' ? (
                    <div>
                        <p>{jokeData.setup}</p>
                        <p>{jokeData.delivery}</p>
                    </div>
                ) : (
                    <p>{jokeData.joke}</p>
                )}
            </div>

            <div
                style={{
                    width: '200px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: 'auto',
                    marginTop: '10px',
                }}
            >
                <button onClick={() => onNewRequest()}>New Request</button>
                <button onClick={() => cleanUpCache()}>Clear Cache</button>
            </div>
        </div>
    );
}

export default App;
