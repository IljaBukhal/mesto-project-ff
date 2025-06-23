function handleEscKeyUp (evt) {
   if (evt.key === "Escape") {
      const popup = document.querySelector(".popup_is-opened");
      closeMdl(popup);
   }
}

export function openMdl(mdl) {
   mdl.classList.add('popup_is-opened');
   document.addEventListener('keyup', handleEscKeyUp);
}

export function closeMdl(mdl) {
   mdl.classList.remove('popup_is-opened');
   document.removeEventListener('keyup', handleEscKeyUp);
}

export function addListenersCloseMdl(mdl) {
   const closeBtn = mdl.querySelector('.popup__close');
   closeBtn.addEventListener('click', () => {
      closeMdl(mdl);
   });
   mdl.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
         closeMdl(mdl);
      }
   });
}