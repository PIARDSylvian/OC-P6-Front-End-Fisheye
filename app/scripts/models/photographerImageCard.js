class PhotographerImageCard extends AbstractModelMedia { // eslint-disable-line
    constructor(data, photographerName) {
        super(data, photographerName)
        this._image = `assets/photographers/${this._photographerName}/${data.image}`;
    }

    getMediaCardDOM() {
        return (new PhotographerTemplateImage(this)).getRender(); // eslint-disable-line
    }
}