class PhotographerTemplateCard extends AbstractTemplatePhotographer { // eslint-disable-line
    constructor(data) {
        super(data)
        this._id = data._id;
        this._city = data._city;
        this._country = data._country;
        this._tagline = data._tagline;
        this._price = data._price;
    }

    getRender() {
        const article = super.getRender();
        article.classList.add('photographer');

        let img = article.querySelector('img');
        img.setAttribute('alt', this._name);
        img.classList.add('photographer__picture')

        let title = article.querySelector('h2');
        title.classList.add('photographer__title');

        const link = document.createElement('a');
        link.setAttribute("href", `/photographer#${this._id}`);

        link.appendChild(img);
        link.appendChild(title);
        article.appendChild(link);

        const location = document.createElement('p');
        location.textContent = `${this._city}, ${this._country}`;
        location.classList.add('photographer__location')
        article.appendChild(location);

        const tagline = document.createElement('p');
        tagline.textContent = this._tagline;
        tagline.classList.add('photographer__tagline')
        article.appendChild(tagline);

        const price = document.createElement('p');
        price.textContent = this._price + "€/jour";
        price.classList.add('photographer__price')
        article.appendChild(price);

        return article;
    }
}