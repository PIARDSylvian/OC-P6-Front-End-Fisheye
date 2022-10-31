/**
 * Get id in Url
 * 
 * @returns id
 */
function getUrlParmeterId (){
    return window.location.hash.substring(1);
}

async function getPhotographer(id) {
    const data = await getPhotographers().then(data => {
        let filteredData = data.photographers.find((photographer) => photographer.id == id);
        filteredData.media = data.media.filter((media) => media.photographerId == id);
        return filteredData;
    });

    return data
}

function addCarouselBase() {
    const carousel = document.createElement('div');
    carousel.classList.add('carousel');
    carousel.dataset.idx = 0;

    const buttonPrev = document.createElement('button');
    buttonPrev.setAttribute("aria-label","Media precedent")
    buttonPrev.innerText = "<";
    const buttonNext = document.createElement('button');
    buttonNext.setAttribute("aria-label","Media suivant")
    buttonNext.innerText = ">";
    const carouselContent = document.createElement('div');
    carouselContent.classList.add('carousel__content');

    carousel.append(buttonPrev, carouselContent, buttonNext);

    buttonPrev.addEventListener('click', () => {
        elements = carouselContent.querySelectorAll('.carousel__content>*');
        const newIndex = +carousel.dataset.idx - 1;

        if(newIndex < 0) {
            carousel.dataset.idx = (elements.length - 1);
        } else {
            carousel.dataset.idx = newIndex;
        }

        elements.forEach((element) => {
            if(element.dataset.order === carousel.dataset.idx) element.setAttribute('aria-hidden', false);
            else element.setAttribute('aria-hidden', true);
        });
    });
    buttonNext.addEventListener('click', () => {
        elements = carouselContent.querySelectorAll('.carousel__content>*');
        const newIndex = +carousel.dataset.idx + 1;

        if(newIndex > (elements.length - 1)) {
            carousel.dataset.idx = 0;
        } else {
            carousel.dataset.idx = newIndex;
        }

        elements.forEach((element) => {
            if(element.dataset.order === carousel.dataset.idx) element.setAttribute('aria-hidden', false);
            else element.setAttribute('aria-hidden', true);
        });
    });
    return carousel;
}

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
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        e.target.querySelectorAll("input:not([type='submit'])").forEach((elem) => console.log(elem.value));
    });

    return [header, form];
}

async function displayData(photographer) {
    const header = document.querySelector(".photographer__header");
    const photographerModel = photographerFactory(photographer, photographer.id);
    const userPageDOM = photographerModel.getUserPageDOM();

    header.prepend(userPageDOM.info);
    header.append(userPageDOM.image);

    
    let likes = 0;
    photographer.media.forEach((media) => likes += media.likes);

    addTotalLikeAndPrice(likes, userPageDOM.price);

    function onOpenModalCarousel(event) {
        const carousel = document.querySelector('.modal .carousel');
        carousel.dataset.idx = event.composedPath().find(element => element.tagName === "FIGURE").dataset.order;

        const carouselContent = carousel.querySelectorAll('.carousel__content>div');
        carouselContent.forEach((media) => {
            if(media.dataset.order == carousel.dataset.idx) media.setAttribute('aria-hidden', false);
            else media.setAttribute('aria-hidden', true);
        });
    }

    function onCloseModalCarousel() {
        const carouselIdx = document.querySelector('#carousel_modal .carousel').dataset.idx;
        const allMedia = document.querySelectorAll('.photographer__section__media-wrapper figure');
        allMedia.forEach((media)=>{
            if(media.dataset.order === carouselIdx) {
                const link = media.querySelector('a');
                link.focus();
            };
        });
    }

    const openModalCarousel = addModal(addCarouselBase(), 'carousel_modal', (event)=>{onOpenModalCarousel(event)}, (event)=>{onCloseModalCarousel()});
    addMedia(photographer.media, photographer.name, openModalCarousel);

    function onCloseModalContact() {
        document.querySelector("#contact_modal form").reset();
        document.querySelector(".photographer__header .contact_button").focus();
    }

    const openModalContact = addModal(addContactForm(photographer.name),'contact_modal', ()=>{}, ()=> onCloseModalContact());
    document.querySelector(".photographer__header .contact_button").addEventListener("click",(e)=> openModalContact(e));
};

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

function addMedia(medias, name, openModal) {
    const wrapper = document.querySelector(".photographer__section__media-wrapper");
    medias = sortMedia(medias);
    wrapper.dataset.sort = "0";
    medias.forEach((media, idx) => {
        const result = mediaFactory(media, name);
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
            likeCount = element.querySelector('.like_count p')
            let likes = +likeCount.innerText;
            likes++;
            likeCount.innerText = likes;
            document.querySelector('.photographer__like-and-price div p').innerText++;
        });
        
        wrapper.appendChild(element);
    });

    const select = document.querySelector("#listbox_sort_by");
    select.addEventListener('blur', function(){
        const value = select.querySelector('li[aria-selected="true"]').dataset.value;
        const sort = sortMedia(medias, value);
        sort.forEach((media, idx) => {
            document.querySelector(`.photographer__section__media-wrapper figure[data-id="${media.id}"]`).style.order = idx;
            document.querySelector(`.photographer__section__media-wrapper figure[data-id="${media.id}"]`).dataset.order = idx;
            document.querySelector(`#carousel_modal .carousel__content div[data-id="${media.id}"]`).dataset.order = idx;
        });
    });
}

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

function addModal(content, id,callBackOpen = ()=>{}, callBackClose = ()=>{}) {
    const main = document.querySelector('main');
    const modal = document.createElement('div');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-hidden', true);
    modal.setAttribute('id', id);
    modal.classList.add('modal');

    const closeBtn = document.createElement('input');
    closeBtn.setAttribute('type', 'image');
    closeBtn.setAttribute('src', 'assets/icons/close.svg');
    closeBtn.setAttribute('alt', 'close');
    
    modal.appendChild(closeBtn);

    if(!content.length) modal.appendChild(content);
    else content.forEach((elem)=>modal.appendChild(elem));

    document.addEventListener("click", () => {
        if(document.querySelector(".modal.open[aria-hidden='false']")) closeBtn.click();
    });
      
    modal.addEventListener("click", (event) => event.stopPropagation());

    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        callBackClose(e);
        main.setAttribute('aria-hidden', false);
        modal.setAttribute('aria-hidden', true);
        modal.classList.remove('open');
        document.body.style.overflow = "auto";
    });

    const openModal = (e) => {
        e.preventDefault();
        if(document.querySelector(".modal.open[aria-hidden='false']")) return;
        callBackOpen(e);
        document.body.style.overflow = "hidden";
        main.setAttribute('aria-hidden', true);
        modal.setAttribute('aria-hidden', false);
        modal.style.top = `calc(50% + ${window.scrollY}px)`;
        setTimeout(() => modal.classList.add('open'), 10);
        closeBtn.focus();
    }

    document.body.appendChild(modal);

    return openModal;
}

async function init() {
    const data = await getPhotographer(getUrlParmeterId());
    const select = new CustomSelect('sort_by', 'Trier par', ['Popularité', 'Date', 'Titre']).createSelect();

    document.querySelector(".photographer__section nav").append(select);
    displayData(data);
};

init();