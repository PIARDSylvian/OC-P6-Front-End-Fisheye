/**
 * Abstract Class for Media must be extend
 * add all common values
 */
class AbstractModelMedia { // eslint-disable-line
    constructor(data, photographerName) {
        if (this.constructor === AbstractModelMedia) {
            throw new TypeError('Abstract class "AbstractModelMedia" cannot be instantiated directly');
        }
        this._date = data.date;
        this._id = data.id;
        this._likes = data.likes;
        this._photographerId = data.photographerId;
        this._photographerName = this.getFirstName(photographerName);
        this._price = data.price;
        this._title = data.title;
    }

    getFirstName(photographerName) {
        return (photographerName.split(' ')[0]).replace('-', ' ')
    }

    getMediaCardDOM() {
        const article = document.createElement('article');
        const h3 = document.createElement('h3');
        h3.textContent = this._title;
        const p = document.createElement('p');
        p.textContent = this._likes;
        article.appendChild(h3);
        article.appendChild(p);

        return (article);
    }
}