class PhotographerModelCard extends AbstractModelPhotographer { // eslint-disable-line
    constructor(data) {
        super(data)
        this._picture = `assets/photographers/Photographers ID Photos/${data.portrait}`;
        this._id = data.id;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price; 
    }

    getUserCardDOM() {
        return (new PhotographerTemplateCard(this)).getRender(); // eslint-disable-line
    }
}