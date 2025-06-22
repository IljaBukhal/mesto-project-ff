import { createCard } from './card.js';

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

export function setUpProfileSave(form, profileInfo, ttl, desc) {
   form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const form = evt.currentTarget;
      const name = form.querySelector('[name="name"]').value;
      const job = form.querySelector('[name="description"]').value;
      const openedMdl = document.querySelector('.popup_is-opened');
      profileInfo.name = name;
      profileInfo.job = job;
      closeMdl(openedMdl);
      ttl.textContent = profileInfo.name;
      desc.textContent = profileInfo.job;
   });
}

export function setUpAddNewPlace(form, cardList, template) {
   form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const openedMdl = document.querySelector('.popup_is-opened');
      const form = evt.currentTarget;
      const place = form.querySelector('[name="place-name"]').value;
      const link = form.querySelector('[name="link"]').value;
      const newCard = createCard({ name: place, link: link}, template);
      cardList.prepend(newCard);
      closeMdl(openedMdl);
   });
}

export function imgClickHandler(evt) {
   const mdlImage = document.querySelector('.popup_type_image');
   const popupImage = mdlImage.querySelector('.popup__image');
   const popupCaption = mdlImage.querySelector('.popup__caption');
   const selectedCard = evt.target.closest('.card');

   popupImage.src = evt.target.src;
   popupCaption.textContent = selectedCard.querySelector('.card__description').textContent;
   addListenersCloseMdl(mdlImage);
   openMdl(mdlImage);
}