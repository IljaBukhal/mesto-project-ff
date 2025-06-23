import '../pages/index.css';
import { initialCards } from './cards.js';
import { 
   deleteBtnHandler,
   likeBtnHandler,
   imgClickHandler,
   createCard, 
   renderCards 
} from './card.js';
import { 
   openMdl,
   closeMdl,
   addListenersCloseMdl
} from './modal.js';

const callbacksCreateCards = [
   deleteBtnHandler,
   likeBtnHandler,
   imgClickHandler,
   openMdl
];

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileEditBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');

const mdlProfileEdit = document.querySelector('.popup_type_edit');
const mdlAddCard = document.querySelector('.popup_type_new-card');
const mdlImage = document.querySelector('.popup_type_image');
const modals = document.querySelectorAll('.popup'); 

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.querySelector('[name="name"]');
const jobInput = formEditProfile.querySelector('[name="description"]');

const formNewPlace = document.forms['new-place'];
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
   formNewPlace.reset();
   openMdl(mdlAddCard)
});

modals.forEach((mdl) => addListenersCloseMdl(mdl));

formEditProfile.addEventListener('submit', (evt) => {
   evt.preventDefault();
   const form = evt.currentTarget;
   const name = form.querySelector('[name="name"]').value;
   const job = form.querySelector('[name="description"]').value;
   const openedMdl = document.querySelector('.popup_is-opened');
   profileInfo.name = name;
   profileInfo.job = job;
   closeMdl(openedMdl);
   profileTitle.textContent = profileInfo.name;
   profileDescription.textContent = profileInfo.job;
});

formNewPlace.addEventListener('submit', (evt) => {
   evt.preventDefault();
   const openedMdl = document.querySelector('.popup_is-opened');
   const form = evt.currentTarget;
   const place = form.querySelector('[name="place-name"]').value;
   const link = form.querySelector('[name="link"]').value;
   const newCard = createCard({ name: place, link: link}, templateCard, callbacksCreateCards);
   placesList.prepend(newCard);
   closeMdl(openedMdl);
});


renderCards(initialCards, placesList, templateCard, callbacksCreateCards);