function mediaFactory(media, photographerName) {
    if(media.image) {
        return new PhotographerImageCard(media, photographerName);
    } else if(media.video) {
        return new PhotographerVideoCard(media, photographerName);
    } else {
        throw 'Unknown media format'
    }
}