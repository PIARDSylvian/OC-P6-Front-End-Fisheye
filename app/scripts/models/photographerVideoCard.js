class PhotographerVideoCard extends AbstractModelMedia {
    constructor(data, photographerName) {
        super(data, photographerName)
        this._video = `assets/photographers/${this._photographerName}/${data.video}`;
    }

    getMediaCardDOM() {
        return (new PhotographerTemplateVideo(this)).getRender();
    }
}