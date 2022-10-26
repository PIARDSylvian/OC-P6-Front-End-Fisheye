class PhotographerTemplateVideo extends AbstractTemplateMedia {
    constructor(data) {
        super(data)
        this._video = data._video;
    }

    getRender() {
        const {figure, figcaption, like, link} = super.getRender();

        const video = document.createElement('video');

        const source = document.createElement('source');
        source.setAttribute('src', this._video);
        source.setAttribute('type', 'video/mp4');
        video.appendChild(source);

        link.appendChild(video);
        figure.appendChild(link);
        figure.appendChild(figcaption);
        figure.appendChild(like);

        return figure;
    }
}