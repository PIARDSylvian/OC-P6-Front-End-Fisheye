/**
 * Retrun data if card / page
 * 
 * @param {Array} data data of photographer 
 * @param {Number} id id of photographer
 * 
 * @returns {Object} for call render
 */
function photographerFactory(data, id) { // eslint-disable-line
    if(!id) {
        return new PhotographerModelCard(data); // eslint-disable-line
    } else if(Number.isInteger(id)) {
        return new PhotographerModelPage(data); // eslint-disable-line
    } else {
        throw 'Unknown id format'
    }
}