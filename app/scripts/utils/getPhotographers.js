async function getPhotographers() {
    return await fetch('./data/photographers.json').then((response) => response.json());
}