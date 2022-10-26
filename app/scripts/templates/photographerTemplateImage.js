class PhotographerTemplateImage extends AbstractTemplateMedia {
    constructor(data) {
        super(data)
        this._image = data._image;
    }

    getRender() {
        const {figure, figcaption, like, link} = super.getRender();

        const img = document.createElement('img');
        img.setAttribute('src', this._image);
        img.setAttribute('alt', this._title);
        link.appendChild(img);
        figure.appendChild(link);
        figure.appendChild(figcaption);
        figure.appendChild(like);

        return figure;
    }
}