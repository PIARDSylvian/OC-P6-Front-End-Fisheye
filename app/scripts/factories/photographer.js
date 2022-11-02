/**
 * Retrun data if card / page
 * 
 * @param {Array} data data of photographer 
 * @param {Number} id id of photographer
 * 
 * @returns {Object} for call render
 */
function photographerFactory(data, id) {
    if(!id) {
        return new PhotographerModelCard(data);
    } else if(Number.isInteger(id)) {
        return new PhotographerModelPage(data);
    } else {
        throw 'Unknown id format'
    }
}