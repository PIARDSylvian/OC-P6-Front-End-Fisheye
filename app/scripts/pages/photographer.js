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
        let filteredData;

        data.photographers.forEach((photographer) => {
            if(photographer.id == id) filteredData = photographer;
        });
        
        filteredData.media = [];
        data.media.forEach((media) => {
            if(media.photographerId == id) filteredData.media.push(media);
        });
        return filteredData;
    });

    return (data)
}

async function displayData(photographer) {
    const header = document.querySelector(".photographer__header");
    const photographerModel = photographerFactory(photographer, photographer.id);
    const userPageDOM = photographerModel.getUserPageDOM();

    header.prepend(userPageDOM.info);
    header.append(userPageDOM.image);
};

async function init() {
    const data = await getPhotographer(getUrlParmeterId());
    displayData(data);
};

init();