export const requestJoke = async () => {
    const url = 'https://v2.jokeapi.dev/joke/Any';
    const response = await fetch(url);
    const result = await response.json();
    return result;
};
