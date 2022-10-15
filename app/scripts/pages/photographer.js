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
    // const photographersSection = document.querySelector(".photographer_section");

    // photographer.forEach((photographer) => {
    //     const photographerModel = photographerFactoryExtend(photographer);
    //     const userCardDOM = photographerModel.getUserCardDOM();
    //     photographersSection.appendChild(userCardDOM);
    // });
};

async function init() {
   // Récupère les datas des photographes
    const data = await getPhotographer(getUrlParmeterId());
    displayData(data);
};

init();