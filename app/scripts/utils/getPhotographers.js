/**
 * Get value on file photographers.json
 * 
 * @returns {array} 
 */
async function getPhotographers() {
    return await fetch('./data/photographers.json').then((response) => response.json());
}