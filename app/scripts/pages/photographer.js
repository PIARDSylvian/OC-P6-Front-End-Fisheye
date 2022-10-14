//Mettre le code JavaScript lié à la page photographer.html

/**
 * Get id in Url
 * 
 * @returns id
 */
function getUrlParmeterId (){
    return window.location.hash.substr(1);
}

console.log("id : "+getUrlParmeterId());