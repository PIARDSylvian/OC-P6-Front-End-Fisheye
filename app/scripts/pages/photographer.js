/**
 * Get id in Url
 * 
 * @returns id
 */
function getUrlParmeterId (){
    return window.location.hash.substring(1);
}

/**
 * Get photographer data by id 
 * 
 * @param {Number} id 
 * @returns {Array} data
 */
async function getPhotographer(id) {
    const data = await getPhotographers().then(data => { // eslint-disable-line
        let filteredData = data.photographers.find((photographer) => photographer.id == id);
        filteredData.media = data.media.filter((media) => media.photographerId == id);
        return filteredData;
    });

    return data
}

/**
 * Create structure for contact form
 * 
 * @param {string} photographerName
 * 
 * @returns {Array} width header, form
 */
function addContactForm(photographerName) {
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.innerHTML = "Contactez-moi <br>" + photographerName;
    header.append(h1);
    const form = document.createElement('form');

    const labelFirstName = document.createElement('label');
    labelFirstName.innerText = "Prénom";
    labelFirstName.setAttribute("for", "firstName");
    const inputFirstName = document.createElement('input');
    inputFirstName.id  = "firstName";

    const labelLastName = document.createElement('label');
    labelLastName.innerText = "Nom";
    labelLastName.setAttribute("for", "lastName");
    const inputLastName = document.createElement('input');
    inputLastName.id  = "lastName";


    const labelEmail = document.createElement('label');
    labelEmail.innerText = "Email";
    labelEmail.setAttribute("for", "email");
    const inputEmail = document.createElement('input');
    inputEmail.id  = "email";


    const labelMessage = document.createElement('label');
    labelMessage.innerText = "Votre message";
    labelMessage.setAttribute("for", "message");
    const inputMessage = document.createElement('textarea');
    inputMessage.id  = "message";

    const submitButton = document.createElement('input');
    submitButton.type="submit";
    submitButton.value="Envoyer";

    form.append(labelFirstName, inputFirstName, labelLastName, inputLastName, labelEmail, inputEmail, labelMessage, inputMessage, submitButton);
    form.addEventListener("submit", (formSubmitEvent) => {
        formSubmitEvent.preventDefault();
        formSubmitEvent.target.querySelectorAll("input:not([type='submit']), textarea").forEach((elem) => console.log(elem.value));
    });

    return [header, form];
}

/**
 * Sort media by value
 * @param {Array} medias items to sort 
 * @param {Number} value to determine sort
 * 
 * @returns {Array} sorted medias 
 */
function sortMedia(medias, value) {
    switch (value) {
        case '2':
            medias.sort((a, b) => {
                if(a.title < b.title) { return -1; }
                if(a.title > b.title) { return 1; }
                return 0;
            });
            break;
        case '1':
            medias.sort((a, b) => new Date(b.date) - new Date(a.date))
            break;
        case '0':
        default:
            medias.sort((a, b) => b.likes - a.likes);
            break;
    }

    return medias;
}

/**
 * Add media on page & events
 * 
 * @param {Array} medias list of media 
 * @param {String} name of photographe 
 * @param {Function} openModal to call open modal (for carousel)
 */
function addMedia(medias, name, openModal) {
    const wrapper = document.querySelector(".photographer__section__media-wrapper");
    medias = sortMedia(medias);
    wrapper.dataset.sort = "0";
    medias.forEach((media, idx) => {
        const result = mediaFactory(media, name); // eslint-disable-line
        const element = result.getMediaCardDOM();
        element.dataset.idx = idx;
        element.dataset.order = idx;
        element.dataset.id = media.id;
        const content = element.querySelector('a');
        content.addEventListener('click', (event) => openModal(event));
        const clone = content.cloneNode(true).querySelector('img, video');
        if(clone.tagName === "VIDEO") clone.setAttribute("controls", "");
        const h3 = document.createElement('h3');
        h3.innerText = element.getElementsByTagName('figcaption')[0].innerText;
        const mediaWrapper = document.createElement('div');
        mediaWrapper.append(clone, h3);
        mediaWrapper.setAttribute('aria-hidden', true);
        mediaWrapper.dataset.idx = idx;
        mediaWrapper.dataset.order = idx;
        mediaWrapper.dataset.id = media.id;
        if(idx == 0) mediaWrapper.setAttribute('aria-hidden', false);
        document.querySelector('.carousel__content').append(mediaWrapper);
        const likeButton = element.querySelector('.like_count input');
        likeButton.addEventListener('click',()=>{
            const likeCount = element.querySelector('.like_count p')
            let likes = +likeCount.innerText;
            likes++;
            likeCount.innerText = likes;
            document.querySelector('.photographer__like-and-price div p').innerText++;
        });
        
        wrapper.appendChild(element);
    });

    const select = document.querySelector("#listbox_sort_by");
    select.addEventListener('blur', function(){
        const value = select.querySelector('a[aria-selected="true"]').dataset.value;
        const sort = sortMedia(medias, value);
        let count = 5;
        sort.forEach((media, idx) => {
            document.querySelector(`.photographer__section__media-wrapper figure[data-id="${media.id}"] a`).setAttribute("tabindex", count);
            count++
            document.querySelector(`.photographer__section__media-wrapper figure[data-id="${media.id}"] input`).setAttribute("tabindex", count);
            count++
            document.querySelector(`.photographer__section__media-wrapper figure[data-id="${media.id}"]`).style.order = idx;
            document.querySelector(`.photographer__section__media-wrapper figure[data-id="${media.id}"]`).dataset.order = idx;
            document.querySelector(`#carousel_modal .carousel__content div[data-id="${media.id}"]`).dataset.order = idx;
        });

        document.querySelector('#label_sort_by').focus();
    });
}

/**
 * Add likes and price on page
 * 
 * @param {Number} likes of all like 
 * @param {String} price per day
 */
function addTotalLikeAndPrice(likes, price) {
    const div = document.createElement('div');
    div.classList.add('photographer__like-and-price');

    const divLike = document.createElement('div');
    const p = document.createElement('p');
    p.innerText = likes;
    const img = document.createElement('img');
    img.setAttribute('src', 'assets/icons/heart.svg');
    img.setAttribute('alt', 'like');
    
    divLike.appendChild(p);
    divLike.appendChild(img);

    div.appendChild(divLike);
    div.appendChild(price);

    document.querySelector("main").append(div);
}

async function displayData(photographer) {
    /**
     * Add info HEADER
     */
    const header = document.querySelector(".photographer__header");
    const photographerModel = photographerFactory(photographer, photographer.id); // eslint-disable-line
    const userPageDOM = photographerModel.getUserPageDOM();
    header.prepend(userPageDOM.info);
    header.append(userPageDOM.image);

    /**
     * Add Likes & ¨Price bottom right page
     */
    let likes = 0;
    photographer.media.forEach((media) => likes += media.likes);
    addTotalLikeAndPrice(likes, userPageDOM.price);

    /**
     * Event on open carousel
     * @param {Event} event
     */
    function onOpenModalCarousel(event) {
        const carousel = document.querySelector('.modal .carousel');
        carousel.dataset.idx = event.composedPath().find(element => element.tagName === "FIGURE").dataset.order;

        const carouselContent = carousel.querySelectorAll('.carousel__content>div');
        carouselContent.forEach((media) => {
            if(media.dataset.order == carousel.dataset.idx) media.setAttribute('aria-hidden', false);
            else media.setAttribute('aria-hidden', true);
        });
    }

    /**
     * Event on close carousel
     * @param {Event} event
     */
    function onCloseModalCarousel() {
        const carouselIdx = document.querySelector('#carousel_modal .carousel').dataset.idx;
        const allMedia = document.querySelectorAll('.photographer__section__media-wrapper figure');
        allMedia.forEach((media)=>{
            if(media.dataset.order === carouselIdx) {
                const link = media.querySelector('a');
                link.focus();
            }
        });
    }

    /**
     * Add modal carousel and get open modal fonction
     */
    const openModalCarousel = addModal(addCarouselBase(), 'carousel_modal', (event)=>{onOpenModalCarousel(event)}, (event)=>{onCloseModalCarousel()}); // eslint-disable-line

    /**
     * Add all medai on page
     */
    addMedia(photographer.media, photographer.name, openModalCarousel);

    /**
     * Event on close contact
     */
    function onCloseModalContact() {
        document.querySelector("#contact_modal form").reset();
        document.querySelector(".photographer__header .contact_button").focus();
    }

    /**
     * Add modal contact and get open modal fonction
     */
    const openModalContact = addModal(addContactForm(photographer.name),'contact_modal', ()=>{}, ()=> onCloseModalContact()); // eslint-disable-line

    /**
     * Add listner for contact modal 
     */
    document.querySelector(".photographer__header .contact_button").addEventListener("click",(e)=> openModalContact(e));
}

async function init() {
    const data = await getPhotographer(getUrlParmeterId());
    const select = new CustomSelect('sort_by', 'Trier par', ['Popularité', 'Date', 'Titre']).createSelect(); // eslint-disable-line
    select.querySelector("#sort_by").setAttribute('tabindex', "3");
    document.querySelector(".photographer__section nav").append(select);
    displayData(data);
}

init();