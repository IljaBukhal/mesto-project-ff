const templateCard = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function removeCard (event) {
   event.target.closest('.card').remove();
}

function createCard(card, delCallback) {
   const cardElement = templateCard.cloneNode(true);
   const cardImage = cardElement.querySelector('.card__image');
   const cardTitle = cardElement.querySelector('.card__title');
   const deleteButton = cardElement.querySelector('.card__delete-button');

   cardImage.setAttribute('src', card.link);
   cardImage.setAttribute('alt', card.name);
   cardTitle.insertAdjacentText('afterbegin', card.name);
   deleteButton.addEventListener('click', delCallback);
   return cardElement;
}

function renderCards() {
   initialCards.forEach(card => {
      const newCard = createCard(card, removeCard);
      placesList.append(newCard);
   });
}

renderCards();