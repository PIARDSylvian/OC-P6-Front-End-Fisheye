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

    return (data)
}

function addCarouselBase() {
    const carousel = document.createElement('div');
    carousel.classList.add('carousel');
    carousel.dataset.idx = 0;

    const buttonPrev = document.createElement('button');
    buttonPrev.innerText = "<";
    const buttonNext = document.createElement('button');
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

        elements.forEach((element, idx) => {
            if(idx === +carousel.dataset.idx) element.setAttribute('aria-hidden', false);
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

        elements.forEach((element, idx) => {
            if(idx === +carousel.dataset.idx) element.setAttribute('aria-hidden', false);
            else element.setAttribute('aria-hidden', true);
        });
    });
    return carousel
}

async function displayData(photographer) {
    const header = document.querySelector(".photographer__header");
    const photographerModel = photographerFactory(photographer, photographer.id);
    const userPageDOM = photographerModel.getUserPageDOM();

    header.prepend(userPageDOM.info);
    header.append(userPageDOM.image);

    
    let likes = 0;
    photographer.media.forEach((media) => likes += media.likes);

    AddTotalLikeAndPrice(likes, userPageDOM.price);

    function onOpenModal(event) {
        const carousel = document.querySelector('.modal .carousel');
        carousel.dataset.idx = event.composedPath().find(element => element.tagName === "FIGURE").dataset.idx;

        const carouselContent = carousel.querySelectorAll('.carousel__content>div');
        carouselContent.forEach((media, idx) => {
            if(idx == carousel.dataset.idx) media.setAttribute('aria-hidden', false);
            else media.setAttribute('aria-hidden', true);
        });
    }

    const openModal = addModal(addCarouselBase(), (event)=>{onOpenModal(event)}, (event)=>{console.log('close :', event)});
    AddMedia(photographer.media, photographer.name, openModal);
    
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

function AddMedia(medias, name, openModal) {
    const wrapper = document.querySelector(".photographer__section__media-wrapper");
    medias = sortMedia(medias);
    wrapper.dataset.sort = "0";
    medias.forEach((media, idx) => {
        const result = mediaFactory(media, name);
        const element = result.getMediaCardDOM();
        element.dataset.idx = idx;

        const content = element.querySelector('img, video');
        content.addEventListener('click', (event) => openModal(event));
        const clone = content.cloneNode(true);
        const h3 = document.createElement('h3');
        h3.innerText = element.getElementsByTagName('figcaption')[0].innerText;
        const mediaWrapper = document.createElement('div');
        mediaWrapper.append(clone, h3);
        mediaWrapper.setAttribute('aria-hidden', true);
        if(idx == 0) {
            mediaWrapper.setAttribute('aria-hidden', false);
        }
        document.querySelector('.carousel__content').append(mediaWrapper);

        wrapper.appendChild(element);
    });

    const select = document.querySelector("#listbox_sort_by");
    select.addEventListener('blur', function(){
        const value = select.querySelector('li[aria-selected="true"]').dataset.value;
        if (value !== wrapper.dataset.sort) {
            wrapper.innerHTML = '';
            wrapper.dataset.sort = value;

            const sort = sortMedia(medias, value);
            sort.forEach((media, idx) => {
                const result = mediaFactory(media, name);
                const element = result.getMediaCardDOM();
                element.dataset.idx = idx;
                const content = element.querySelector('img, video');
                content.addEventListener('click', (event) => openModal(event));
                const clone = content.cloneNode(true);
                const h3 = document.createElement('h3');
                h3.innerText = element.getElementsByTagName('figcaption')[0].innerText;
                const mediaWrapper = document.createElement('div');
                mediaWrapper.append(clone, h3);
                mediaWrapper.setAttribute('aria-hidden', true);
                if(idx == 0) {
                    mediaWrapper.setAttribute('aria-hidden', false);
                 }
                document.querySelector('.carousel__content').append(mediaWrapper);

                wrapper.appendChild(element);
            });
        }
    });
}

function AddTotalLikeAndPrice(likes, price) {
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

function addModal(content, callBackOpen = ()=>{}, callBackClose = ()=>{}) {
    const main = document.querySelector('main');
    const modal = document.createElement('div');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-hidden', true);
    modal.classList.add('modal');

    const img = document.createElement('img');
    img.setAttribute('src', 'assets/icons/close.svg');
    img.setAttribute('alt', 'close');
    modal.appendChild(img);
    modal.appendChild(content);

    document.addEventListener("click", () => {
        if(document.querySelector(".modal.open[aria-hidden='false']")) img.click();
    });
      
    modal.addEventListener("click", (event) => event.stopPropagation());

    img.addEventListener('click', (event) => {
        callBackClose(event);
        main.setAttribute('aria-hidden', false);
        modal.setAttribute('aria-hidden', true);
        modal.classList.remove('open');
        document.body.style.overflow = "auto";
    });

    const openModal = (e) => {
        if(document.querySelector(".modal.open[aria-hidden='false']")) return;
        callBackOpen(e);
        document.body.style.overflow = "hidden";
        main.setAttribute('aria-hidden', true);
        modal.setAttribute('aria-hidden', false);
        modal.style.top = `calc(50% + ${window.scrollY}px)`;
        setTimeout(() => modal.classList.add('open'), 10);
    }

    document.body.appendChild(modal);

    return openModal;
}

function CustomSelect(id, name, data) {
    this._data = data;
    this._id = id;
    this._name = name;
    this._idx = 0;

    const createOption = () => {
        const listbox = document.createElement('ul');
        listbox.setAttribute("id", "listbox_" + this._id);
        listbox.setAttribute("role", "listbox");
        listbox.setAttribute("aria-labelledby", "label_" + this._id);
        listbox.setAttribute("tabindex", -1);

        this._data.map((name, idx) => {
            const option = document.createElement('li');
            option.setAttribute("id", this._id + "_" + idx);
            option.setAttribute("role", "option");
            option.setAttribute('aria-selected', `${idx === 0}`);
            option.dataset.value = idx;
            option.innerText = name;

            if (idx === 0) option.classList.add('select');

            listbox.append(option);
        });

        return listbox
    };

    const keydown = (key, optionsGroup) => {
        switch (key) {
            case 'ArrowDown':
                if (this._idx == (optionsGroup.length - 1)) {
                    changeSelect(0, optionsGroup)
                } else {
                    changeSelect(this._idx + 1, optionsGroup)
                }
                return true
                break;
            case 'ArrowUp':
                if (this._idx == 0) {
                    changeSelect((optionsGroup.length - 1), optionsGroup)
                } else {
                    changeSelect(this._idx - 1, optionsGroup)
                }
                return true
                break;
            case 'Enter':
            case ' ':
                changeSelected(optionsGroup[this._idx], optionsGroup)
                return false
                break;
            default:
                return false
                break;
        }
    }

    const changeSelect = (selected, optionsGroup) => {
        this._idx = selected;
        optionsGroup.forEach((option, idx)=> {
            if (idx !== this._idx) {
                option.classList.remove('select');
            } else {
                option.classList.add('select');
            }
        });
    }

    const changeSelected = (selected, optionsGroup) => {
        const list = document.querySelector("#listbox_"+ this._id);
        optionsGroup.forEach((elem) =>{
            if (elem !== selected) list.appendChild(elem)
        });

        if (selected.ariaSelected === "false") {
            optionsGroup.forEach(option=> option.ariaSelected = (selected === option)? true: false);
        }
    }

    const createSelect = () => {
        const label = document.createElement('label');
        label.innerText = this._name;
        label.setAttribute("id", "label_" + this._id);
        label.setAttribute("for", this._id);

        const button = document.createElement('button');
        button.setAttribute("id", this._id);
        button.setAttribute("role", "button");
        button.setAttribute("aria-haspopup", "listbox");
        button.setAttribute("aria-expanded", false);
        button.setAttribute("aria-controls", "listbox_" + this._id);
        button.setAttribute("aria-labelledby", "label_" + this._id);
        button.setAttribute("tabindex", 0);
        button.setAttribute("type", "button");
        
        button.innerText = data[0];

        const options = createOption();

        const select = document.createElement('div');
        select.classList.add('custom_select');
        select.append(label ,button, options);

        // lose focus
        button.addEventListener('blur', function(){
            if(options.classList.contains('is-open')) {
                button.style.zIndex = -1;
            }
        });

        options.addEventListener('blur', function(){
            options.classList.remove('is-open');
            options.style.height = "3em";
            button.style.zIndex = 2;
            this._idx = 0;
            button.innerText = options.querySelector('li[aria-selected="true"]').innerText;
            button.setAttribute("aria-expanded", false);
        });

        // open
        button.addEventListener('click', function(e){
            options.classList.add('is-open');
            options.style.height = "9em";
            button.setAttribute("aria-expanded", true);
            if(e.pointerId == 1 ) options.querySelector('li').classList.remove('select')
            options.focus();
        });

        // select
        options.addEventListener('keydown', function(e){
            const optionsGroup = options.querySelectorAll('li');
            const mouveAction = keydown(e.key, optionsGroup);
            if (!mouveAction) options.blur();
        })

        options.addEventListener('click', function(e){
            const optionsGroup = options.querySelectorAll('li');
            changeSelected(e.target, optionsGroup);
            options.blur();
        })
    
        return select;
    };

    return createSelect();
}

async function init() {
    const data = await getPhotographer(getUrlParmeterId());
    const select = new CustomSelect('sort_by', 'Trier par', ['Popularité', 'Date', 'Titre']);
    document.querySelector(".photographer__section nav").append(select);
    displayData(data);
};

init();