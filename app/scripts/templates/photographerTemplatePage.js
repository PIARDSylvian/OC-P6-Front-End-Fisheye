class PhotographerTemplatePage {
    constructor(data) {
        this._photographer = data;
    }

    getRender() {
        const image = document.createElement('img');
        image.classList.add('photographer__picture');
        image.setAttribute("src", this._photographer._picture);
        image.setAttribute("alt", this._photographer._name);

        const info = document.createElement('div');
        info.innerHTML = `
            <h2 class="photographer__title">${this._photographer._name}</h2>
            <p class="photographer__location">${this._photographer._city}, ${this._photographer._country}</p>
            <p class="photographer__tagline">${this._photographer._tagline}</p>
        `;

        const price = document.createElement('div');
        price.classList.add('photographer__price');
        price.textContent = `${this._photographer._price}€/jour`;

        return {image, info, price};
    }
}