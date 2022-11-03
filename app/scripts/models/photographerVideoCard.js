class PhotographerVideoCard extends AbstractModelMedia { // eslint-disable-line
    constructor(data, photographerName) {
        super(data, photographerName)
        this._video = `assets/photographers/${this._photographerName}/${data.video}`;
    }

    getMediaCardDOM() {
        return (new PhotographerTemplateVideo(this)).getRender(); // eslint-disable-line
    }
}