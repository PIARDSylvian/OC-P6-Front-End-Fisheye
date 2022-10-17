class AbstractTemplatePhotographer {
    constructor(data) {
        if (this.constructor === AbstractModelPhotographer) {
            throw new TypeError('Abstract class "AbstractPhotographer" cannot be instantiated directly');
        }
        this._name = data._name;
        this._picture = data._picture;
    }

    getRender() {
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