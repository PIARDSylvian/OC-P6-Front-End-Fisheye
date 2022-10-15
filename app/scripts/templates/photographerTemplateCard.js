class PhotographerTemplateCard {
    constructor(data) {
        this._photographer = data;
    }

    getRender() {
        const article = document.createElement('article');
        article.classList.add('photographer');

        article.innerHTML = `
            <a href="/photographer#${this._photographer._id}"> 
                <img class="photographer__picture" src="${this._photographer._picture}" alt="${this._photographer._name}">
                <h2 class="photographer__title">${this._photographer._country}</h2>
            </a>
            <p class="photographer__location">${this._photographer._city}, ${this._photographer._country}</p>
            <p class="photographer__tagline">${this._photographer._tagline}</p>
            <p class="photographer__price">${this._photographer._price}€/jour</p>
        `;

        return article;
    }
}