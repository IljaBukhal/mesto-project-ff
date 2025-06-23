import '../pages/index.css';
import { initialCards } from './cards.js';
import { 
   deleteBtnHandler,
   likeBtnHandler,
   createCard, 
   renderCards 
} from './card.js';
import { 
   openMdl,
   closeMdl,
   addListenersCloseMdl
} from './modal.js';

const callbacksCreateCards = {
   deleteBtnHandler,
   likeBtnHandler,
   imgClickHandler
};

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileEditBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');

const mdlProfileEdit = document.querySelector('.popup_type_edit');
const mdlAddCard = document.querySelector('.popup_type_new-card');
const mdlImage = document.querySelector('.popup_type_image');
const modals = document.querySelectorAll('.popup'); 

const popupImage = mdlImage.querySelector('.popup__image');
const popupCaption = mdlImage.querySelector('.popup__caption'); 

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');

const formNewPlace = document.forms['new-place'];
const placeNameInput = formNewPlace.querySelector('.popup__input_type_card-name');
const linkInput = formNewPlace.querySelector('.popup__input_type_url');

const templateCard = document.getElementById('card-template').content;
const placesList = document.querySelector('.places__list');

function imgClickHandler({ name, link }) {
   popupImage.alt = name;
   popupCaption.textContent = name;
   popupImage.src = link;
   openMdl(mdlImage);
}

profileEditBtn.addEventListener('click', () => {
   nameInput.value = profileTitle.textContent;
   jobInput.value = profileDescription.textContent;
   openMdl(mdlProfileEdit);
});

addCardBtn.addEventListener('click', () => {
   formNewPlace.reset();
   openMdl(mdlAddCard);
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
   profileTitle.textContent = name;
   profileDescription.textContent = job;
   closeMdl(openedMdl);
});

formNewPlace.addEventListener('submit', (evt) => {
   evt.preventDefault();
   const openedMdl = document.querySelector('.popup_is-opened');
   const place = placeNameInput.value;
   const link = linkInput.value;
   const newCard = createCard({ name: place, link: link}, templateCard, callbacksCreateCards);
   placesList.prepend(newCard);
   closeMdl(openedMdl);
});

renderCards(initialCards, placesList, templateCard, callbacksCreateCards);