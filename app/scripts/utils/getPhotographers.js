/**
 * Get value on file photographers.json
 * 
 * @returns {array} 
 */
async function getPhotographers() { // eslint-disable-line
    return await fetch('./data/photographers.json').then((response) => response.json());
}