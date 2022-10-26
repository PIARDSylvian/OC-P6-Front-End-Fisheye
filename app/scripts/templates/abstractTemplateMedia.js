class AbstractTemplateMedia {
    constructor(data) {
        if (this.constructor === AbstractTemplateMedia) {
            throw new TypeError('Abstract class "AbstractTemplateMedia" cannot be instantiated directly');
        }
        this._date = data._date;
        this._id = data._id;
        this._likes = data._likes;
        this._photographerId = data._photographerId;
        this._photographerName = data._photographerName;
        this._price = data._price;
        this._title = data._title;
    }

    getRender() {
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');
        figcaption.innerText = this._title;

        const like = document.createElement('div');
        like.classList.add('like_count');

        const p = document.createElement('p');
        p.innerText = this._likes;
        like.appendChild(p);

        const img_eart = document.createElement('input');
        img_eart.setAttribute('type', 'image');
        img_eart.setAttribute('src', 'assets/icons/heart.svg');
        img_eart.setAttribute('alt', 'like');
        const link = document.createElement('a');
        link.setAttribute('href', '#');
        link.setAttribute('role', 'button');
        link.setAttribute('aria-label', 'Afficher en grand');

        like.appendChild(img_eart);

        return {figure, figcaption, like, link};
    }
}