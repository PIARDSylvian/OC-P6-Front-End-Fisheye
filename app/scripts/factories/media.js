/**
 * Retrun right object of media (image or video)
 * 
 * @param {Array} media 
 * @param {string} photographerName
 * 
 * @returns {object} mediaObject for call getMediaCardDOM();
 */
function mediaFactory(media, photographerName) { // eslint-disable-line
    if(media.image) {
        return new PhotographerImageCard(media, photographerName); // eslint-disable-line
    } else if(media.video) {
        return new PhotographerVideoCard(media, photographerName); // eslint-disable-line
    } else {
        throw 'Unknown media format'
    }
}