function photographerFactory(data, id) {
    if(!id) {
        return new PhotographerModelCard(data);
    } else if(Number.isInteger(id))  {
        return new PhotographerModelPage(data);
    } else {
        throw 'Unknown id format'
    }
}