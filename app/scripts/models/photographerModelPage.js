class PhotographerModelPage extends AbstractModelPhotographer {
    constructor(data) {
        super(data)
        this._picture = `assets/photographers/Photographers ID Photos/${data.portrait}`;
        this._id = data.id;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price; 
    }

    getUserPageDOM() {
        return (new PhotographerTemplatePage(this)).getRender();
    }
}