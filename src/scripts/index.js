import '../pages/index.css';
import { createCard } from './card.js';
import {
   enableValidation,
   clearValidation
} from './validation.js'
import { 
   openMdl,
   closeMdl,
   addListenersCloseMdl
} from './modal.js';
import {
   getUserInfo,
   getCards,
   editProfile,
   addNewCard,
   deleteCard,
   toggleLike,
   changeAvatar
} from './api.js';

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const profileEditBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');

const mdlProfileEdit = document.querySelector('.popup_type_edit');
const mdlAddCard = document.querySelector('.popup_type_new-card');
const mdlImage = document.querySelector('.popup_type_image');
const mdlDelCard = document.querySelector('.popup_type_card-delete');
const mdlChangeAvatar = document.querySelector('.popup_type_change-avatar');
const modals = document.querySelectorAll('.popup'); 

const popupImage = mdlImage.querySelector('.popup__image');
const popupCaption = mdlImage.querySelector('.popup__caption'); 

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');

const formNewPlace = document.forms['new-place'];
const placeNameInput = formNewPlace.querySelector('.popup__input_type_card-name');
const linkInput = formNewPlace.querySelector('.popup__input_type_url');

const formChangeAvatar = document.forms['change-avatar'];
const avatarLinkInput = formChangeAvatar.querySelector('.popup__input_type_change-avatar-link');

const cardDelConfirmationBtn = mdlDelCard.querySelector('.popup__button');

const templateCard = document.getElementById('card-template').content;
const placesList = document.querySelector('.places__list');

const validationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type-error',
   errorClass: 'popup__error_visible'
};

const identifiers = {
   myId: '',
   idCardDel: ''
};

function imgClickHandler({ name, link }) {
   popupImage.alt = name;
   popupCaption.textContent = name;
   popupImage.src = link;
   openMdl(mdlImage);
}

let deletedCard;
function deleteBtnHandler(evt) {
   deletedCard = evt.target.closest('.card');
   openMdl(mdlDelCard);
}

const callbacksCreateCards = {
   deleteBtnHandler,
   imgClickHandler,
   toggleLike
};

profileEditBtn.addEventListener('click', () => {
   nameInput.value = profileTitle.textContent;
   jobInput.value = profileDescription.textContent;
   clearValidation(formEditProfile, validationConfig);
   openMdl(mdlProfileEdit);
});

profileAvatar.addEventListener('click', () => {
   formChangeAvatar.reset();
   clearValidation(formChangeAvatar, validationConfig);
   openMdl(mdlChangeAvatar);
});

addCardBtn.addEventListener('click', () => {
   formNewPlace.reset();
   clearValidation(formNewPlace, validationConfig);
   openMdl(mdlAddCard);
});

cardDelConfirmationBtn.addEventListener('click', () => {
   deleteCard(identifiers.idCardDel)
      .then(() => {
         deletedCard.remove(); 
         closeMdl(mdlDelCard);
      })
      .catch(console.log);
});

modals.forEach((mdl) => {
   addListenersCloseMdl(mdl);
   mdl.classList.add('popup_is-animated');
});

formEditProfile.addEventListener('submit', (evt) => {
   evt.preventDefault();
   const name = nameInput.value;
   const job = jobInput.value;
   const formButton = formEditProfile.querySelector('.popup__button');
   formButton.textContent = 'Сохранение...';
   editProfile(name, job)
      .then((profileInfo) => {
         profileTitle.textContent = profileInfo.name;
         profileDescription.textContent = profileInfo.about;
         closeMdl(mdlProfileEdit);
      })
      .catch(console.log)
      .finally(() => {
         formButton.textContent = 'Сохранить';
      });
});

formNewPlace.addEventListener('submit', (evt) => {
   evt.preventDefault();
   const place = placeNameInput.value;
   const link = linkInput.value;
   const formButton = formNewPlace.querySelector('.popup__button');
   formButton.textContent = 'Сохранение...';
   addNewCard(place, link)
      .then((card) => {
         const newCard = createCard(
            card,
            identifiers.myId,
            templateCard,
            identifiers,
            callbacksCreateCards
         );
         placesList.prepend(newCard);
         closeMdl(mdlAddCard);
      })
      .catch(console.log)
      .finally(() => {
         formButton.textContent = 'Сохранить';
      });
});

formChangeAvatar.addEventListener('submit', (evt) => {
   evt.preventDefault();
   const formButton = formChangeAvatar.querySelector('.popup__button');
   formButton.textContent = 'Сохранение...';
   changeAvatar(avatarLinkInput.value)
      .then(() => {
         profileAvatar.style = `background-image: url(${avatarLinkInput.value})`;
         closeMdl(mdlChangeAvatar)
      })
      .catch(console.log)
      .finally(() => {
         formButton.textContent = 'Сохранить';
      });
});

function renderCards(
   cards,
   cardList,
   template,
   identifiers,
   callbacks
) {
   const cardElements = Array.from(cardList.children);
   cardElements.forEach((cardElement) => cardElement.remove());
   cards.forEach(card => {
      const newCard = createCard(
         card,
         identifiers.myId,
         template,
         identifiers,
         callbacks
      );
      cardList.append(newCard);
   });
}

enableValidation(validationConfig);
Promise.all([getUserInfo('me'), getCards()])
   .then(([userInfo, cards]) => {
      profileAvatar.style.backgroundImage = `url('${userInfo.avatar}')`;
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      identifiers.myId = userInfo._id;
      renderCards(
         cards,
         placesList,
         templateCard,
         identifiers,
         callbacksCreateCards
      );
   });