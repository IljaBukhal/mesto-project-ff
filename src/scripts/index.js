import '../pages/index.css';
import { initialCards } from './cards.js';
import { renderCards } from './card.js';
import { 
   openMdl, 
   addListenersCloseMdl,
   setUpProfileSave,
   setUpAddNewPlace
} from './modal.js';

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileEditBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');

const mdlProfileEdit = document.querySelector('.popup_type_edit');
const mdlAddCard = document.querySelector('.popup_type_new-card');

const formEditProfile = document.querySelector('[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('[name="name"]');
const jobInput = formEditProfile.querySelector('[name="description"]');

const formNewPlace = document.querySelector('[name="new-place"]');
const placeNameInput = formNewPlace.querySelector('[name="place-name"]');
const linkInput = formNewPlace.querySelector('[name="link"]');

const profileInfo = {
   name: 'Жак-Ив Кусто',
   job: 'Исследователь океана'
}

const templateCard = document.getElementById('card-template').content;
const placesList = document.querySelector('.places__list');

profileEditBtn.addEventListener('click', () => {
   nameInput.value = profileInfo.name;
   jobInput.value = profileInfo.job;
   openMdl(mdlProfileEdit);
});

addCardBtn.addEventListener('click', () => {
   placeNameInput.value = '';
   linkInput.value = '';
   openMdl(mdlAddCard)
});

addListenersCloseMdl(mdlProfileEdit);
addListenersCloseMdl(mdlAddCard);

setUpProfileSave(
   formEditProfile, 
   profileInfo, 
   profileTitle, 
   profileDescription
);
setUpAddNewPlace(
   formNewPlace,
   placesList,
   templateCard
);

renderCards(initialCards, placesList, templateCard);