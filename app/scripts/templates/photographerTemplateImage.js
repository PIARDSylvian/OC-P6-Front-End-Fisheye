class PhotographerTemplateImage extends AbstractTemplateMedia {
    constructor(data) {
        super(data)
        this._image = data._image;
    }

    getRender() {
        const {figure, figcaption, like} = super.getRender();

        const img = document.createElement('img');
        img.setAttribute('src', this._image);
        img.setAttribute('alt', this._title);

        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.appendChild(like);

        return figure;
    }
}