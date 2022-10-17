class PhotographerTemplatePage extends AbstractTemplatePhotographer {
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

        let image = article.querySelector('img');
        image.setAttribute('alt', this._name);
        image.classList.add('photographer__picture')

        const info = document.createElement('div');

        let title = article.querySelector('h2');
        title.classList.add('photographer__title');
        info.appendChild(title);

        const location = document.createElement('p');
        location.textContent = `${this._city}, ${this._country}`;
        location.classList.add('photographer__location');
        info.appendChild(location);

        const tagline = document.createElement('p');
        tagline.textContent = this._tagline;
        tagline.classList.add('photographer__tagline');
        info.appendChild(tagline);

        const price = document.createElement('p');
        price.textContent = this._price + "€/jour";
        price.classList.add('photographer__price');

        return {image, info, price};
    }
}