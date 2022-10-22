class PhotographerTemplateVideo extends AbstractTemplateMedia {
    constructor(data) {
        super(data)
        this._video = data._video;
    }

    getRender() {
        const {figure, figcaption, like} = super.getRender();

        const video = document.createElement('video');
        video.setAttribute('controls', '');

        const source = document.createElement('source');
        source.setAttribute('src', this._video);
        source.setAttribute('type', 'video/mp4');
        video.appendChild(source);

        figure.appendChild(video);
        figure.appendChild(figcaption);
        figure.appendChild(like);

        return figure;
    }
}