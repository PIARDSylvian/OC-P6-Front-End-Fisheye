/**
 * Retrun right object of media (image or video)
 * 
 * @param {Array} media 
 * @param {string} photographerName
 * 
 * @returns {object} mediaObject for call getMediaCardDOM();
 */
function mediaFactory(media, photographerName) {
    if(media.image) {
        return new PhotographerImageCard(media, photographerName);
    } else if(media.video) {
        return new PhotographerVideoCard(media, photographerName);
    } else {
        throw 'Unknown media format'
    }
}