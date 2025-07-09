import '../pages/index.css';
import { renderCards } from './card.js';
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
   putLike,
   delLike,
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

function deleteBtnHandler(evt) {
   identifiers.idCardDel = evt.target.closest('.card')
      .getAttribute('data-card-id');
   openMdl(mdlDelCard);
}

function likeBtnHandler(evt) {
   evt.target.classList.toggle('card__like-button_is-active');
   const cardId = evt.target.closest('.card').getAttribute('data-card-id');
   getCards()
      .then((cards) => {
         const likedCard = Array.from(cards).find((card) => card['_id'] === cardId);
         const checkLikeFromMe = likedCard.likes
            .some((like) => like['_id'] === identifiers.myId);
         if (!checkLikeFromMe) {
            putLike(likedCard['_id'])
               .finally(getAndRenderCards);
         } else {
            delLike(likedCard['_id'])
               .finally(getAndRenderCards);
         }
      })
      .catch(console.log);
}

const callbacksCreateCards = {
   deleteBtnHandler,
   likeBtnHandler,
   imgClickHandler
};

function getAndRenderCards() {
   getCards()
      .then((cards) => {
         renderCards(
            cards,
            placesList,
            templateCard,
            identifiers,
            callbacksCreateCards
         );
      })
      .catch(console.log);
}

getUserInfo('me')
   .then((userInfo) => {
      profileAvatar.style.backgroundImage = `url('${userInfo.avatar}')`;
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      identifiers.myId = userInfo['_id'];
   })
   .catch(console.log)
   .finally(getAndRenderCards);


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
      .catch(console.log)
      .finally(() => {
         getAndRenderCards();
         closeMdl(mdlDelCard);
      });
});

modals.forEach((mdl) => {
   addListenersCloseMdl(mdl);
   mdl.classList.add('popup_is-animated');
});

formEditProfile.addEventListener('submit', (evt) => {
   evt.preventDefault();
   const openedMdl = document.querySelector('.popup_is-opened');
   const name = nameInput.value;
   const job = jobInput.value;
   const formButton = formEditProfile.querySelector('.popup__button');
   formButton.textContent = 'Сохранение...';
   editProfile(name, job)
      .then((profileInfo) => {
         profileTitle.textContent = profileInfo.name;
         profileDescription.textContent = profileInfo.about;
         closeMdl(openedMdl);
         formButton.textContent = 'Сохранить';
      })
      .catch(console.log);
});

formNewPlace.addEventListener('submit', (evt) => {
   evt.preventDefault();
   const openedMdl = document.querySelector('.popup_is-opened');
   const place = placeNameInput.value;
   const link = linkInput.value;
   const formButton = formNewPlace.querySelector('.popup__button');
   formButton.textContent = 'Сохранение...';
   addNewCard(place, link)
      .catch(console.log)
      .finally(() => {
         getAndRenderCards();
         closeMdl(openedMdl);
         formButton.textContent = 'Сохранить';
      });
});

formChangeAvatar.addEventListener('submit', (evt) => {
   evt.preventDefault();
   const formButton = formChangeAvatar.querySelector('.popup__button');
   formButton.textContent = 'Сохранение...';
   changeAvatar(avatarLinkInput.value)
      .catch(console.log)
      .finally(() => location.reload());
});

enableValidation(validationConfig);