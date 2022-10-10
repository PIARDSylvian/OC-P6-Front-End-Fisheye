function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}

function photographerFactoryExtend(data) {
    const proto = photographerFactory(data)
    const { name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = proto.getUserCardDOM()
        const img = article.querySelector('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;
        const tag = document.createElement('p');
        tag.textContent = tagline;
        const pricePerDay = document.createElement('p');
        pricePerDay.textContent = `${price}€/jour`;
        article.appendChild(location);
        article.appendChild(tag);
        article.appendChild(pricePerDay);
        
        return (article);
    }

    return { name, picture, getUserCardDOM }
}