class PhotographerImageCard extends AbstractModelMedia {
    constructor(data, photographerName) {
        super(data, photographerName)
        this._image = `assets/photographers/${this._photographerName}/${data.image}`;
    }

    getMediaCardDOM() {
        return (new PhotographerTemplateImage(this)).getRender();
    }
}