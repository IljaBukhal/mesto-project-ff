import { imgClickHandler } from './modal.js';

function deleteBtnHandler (evt) {
   evt.target.closest('.card').remove();
}

function likeBtnHandler (evt) {
   evt.currentTarget.classList.toggle('card__like-button_is-active');
}

const callbacksCreateCards = [ 
   deleteBtnHandler,
   likeBtnHandler,
   imgClickHandler
];

export function createCard(card, template, callbacks=callbacksCreateCards) {
   const [ deleteBtnHandler, likeBtnHandler] = callbacks;
   const cardElement = template.cloneNode(true);
   const cardImage = cardElement.querySelector('.card__image');
   const cardTitle = cardElement.querySelector('.card__title');
   const deleteButton = cardElement.querySelector('.card__delete-button');
   const likeButton = cardElement.querySelector('.card__like-button');

   cardImage.setAttribute('src', card.link);
   cardImage.setAttribute('alt', card.name);
   cardTitle.insertAdjacentText('afterbegin', card.name);
   deleteButton.addEventListener('click', deleteBtnHandler);
   likeButton.addEventListener('click', likeBtnHandler);
   cardImage.addEventListener('click', imgClickHandler);
   return cardElement;
}

export function renderCards(cards, cardList, template) {
   cards.forEach(card => {
      const newCard = createCard(card, template);
      cardList.append(newCard);
   });
}