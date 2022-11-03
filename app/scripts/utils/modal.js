/**
 * Create modal & return open function.
 * 
 * @param {*} content 
 * @param {string} id of modal 
 * @param {Function} callBackOpen optional, fonction to call on open modal
 * @param {Function} callBackClose optional, fonction to call on close modal
 * @returns {Function} to open modal
 */
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