/**
 * Abstract Class for photographer must be extend
 * add all common values
 */
class AbstractModelPhotographer { // eslint-disable-line
    constructor(data) {
        if (this.constructor === AbstractModelPhotographer) {
            throw new TypeError('Abstract class "AbstractPhotographer" cannot be instantiated directly');
        }
        this._name = data.name;
        this._picture = `assets/photographers/${data.portrait}`;
    }

    getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", this._picture)
        const h2 = document.createElement('h2');
        h2.textContent = this._name;
        article.appendChild(img);
        article.appendChild(h2);

        return (article);
    }
}